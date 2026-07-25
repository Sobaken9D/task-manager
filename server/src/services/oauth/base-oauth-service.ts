import {
  BadRequestError,
  UnauthorizedError
} from "../../../../shared/utils/errors";
import {
  type ExtractedUserInfo,
  type OAuthTokenResponse,
  type OAuthUserInfoResponse,
  type TypeBaseProviderOptions,
  type TypeUserInfo
} from "../../../types/oauth";


export abstract class BaseOAuthService {
  private BASE_URL: string = '';
  private readonly options: TypeBaseProviderOptions;

  constructor(options: TypeBaseProviderOptions) {
    this.options = options;
  }

  /**
   * Формирует URL для авторизации.
   * @returns URL для авторизации пользователя через OAuth.
   */
  public getAuthUrl(): string {
    const query = new URLSearchParams({
      response_type: 'code', // стандартное требование OAuth
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: (this.options.scopes ?? []).join(' '),
      access_type: 'offline', // обновлять токены доступа, даже если у пользователя закрыт браузер
      prompt: 'consent' // показывать выбор аккаунта при входе в google | github
    });

    return `${this.options.authorize_url}?${query}`;
  }

  /**
   * Находит пользователя по коду авторизации и возвращает информацию о пользователе.
   *
   * @param code - Код авторизации, полученный от провайдера.
   * @returns Объект с информацией о пользователе.
   * @throws BadRequestError - Если не удалось получить токены или пользователь.
   * @throws UnauthorizedException - Если токен доступа недействителен.
   */
  public async findUserByCode(code: string): Promise<TypeUserInfo> {
    const tokenQuery = new URLSearchParams({
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
      code: code,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code'
    });

    // 1. Запрос токенов доступа
    const tokensRequest = await fetch(this.options.access_url, {
      method: 'POST',
      body: tokenQuery,
      headers: {
        // Данные в body в виде URL-текста
        'Content-Type': 'application/x-www-form-urlencoded',
        // Прислать ответ в виде json
        Accept: 'application/json'
      }
    });

    if (!tokensRequest.ok) {
      throw new BadRequestError(`Failed to retrieve tokens from ${this.options.name}. Check the authorization code.`)
    }

    // сервер присылает ответ в виде длинной строки '{"access_token": "abc123xyz"}'
    // .json преобразует его в js объект
    const tokens = await tokensRequest.json() as OAuthTokenResponse;

    if (!tokens.access_token) {
      throw new BadRequestError(`Provider ${this.options.name} did not return an access_token.`)
    }

    // 2. Запрос данных профиля пользователя
    const userRequest = await fetch(this.options.profile_url, {
      headers: {
        // специальное имя заголовка для передачи данных авторизации
        Authorization: `Bearer ${tokens.access_token}`
      }
    });

    if (!userRequest.ok) {
      throw new UnauthorizedError(`Failed to retrieve the user profile from ${this.options.name}.`);
    }

    const rawUser = await userRequest.json() as OAuthUserInfoResponse;

    // 3. Форматирование профиля под единый стандарт
    const formattedUserData = await this.extractUserInfo(rawUser)

    return {
      ...formattedUserData,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      provider: this.options.name
    }
  }

  /**
   * Приводит данные от конкретной соцсети к общему интерфейсу TypeUserInfo.
   * Переопределяется в классах-наследниках.
   */
  protected abstract extractUserInfo(data: any): Promise<ExtractedUserInfo>;

  // protected async extractUserInfo(data: any): Promise<ExtractedUser> {
  //   return {
  //     id: String(data.id || data.sub || ''),
  //     email: data.email || '',
  //     name: data.name || data.login || '',
  //     picture: data.picture || data.avatar_url || ''
  //   };
  // }

  // protected async extractUserInfo(data: any): Promise<Partial<TypeUserInfo>> {
  //   // Если функция async, то:
  //   // return Promise.resolve({ ...data, provider: this.options.name });
  //   return {
  //     ...data,
  //     provider: this.options.name
  //   };
  // }

  /**
   * Возвращает URL для перенаправления после успешной аутентификации.
   * @returns URL для перенаправления.
   */
  private getRedirectUrl(): string {
    return `${this.BASE_URL}/api/auth/oauth/callback/${this.options.name}`;
  }

  /**
   * Сеттер для BASE_URL.
   * @param value - новое значение BASE_URL.
   */
  public set baseUrl(value: string) {
    this.BASE_URL = value;
  }

  /**
   * Геттер для имени провайдера.
   * @returns Строка с именем провайдера.
   */
  public get name(): string {
    return this.options.name;
  }
}

// export const baseOauthService = new BaseOAuthService();