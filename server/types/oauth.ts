// authorize_url - https://accounts.google.com/o/oauth2/v2/auth
// access_url - https://oauth2.googleapis.com/token
// profile_url - https://openidconnect.googleapis.com/v1/userinfo

/**
 * Опции базового провайдера OAuth.
 *
 * Этот тип описывает базовые параметры для аутентификации через OAuth.
 */
export interface TypeBaseProviderOptions {
  name: string // имя провайдера "google" | "github"
  authorize_url: string // адрес для авторизации через Google | Github (ДЛЯ КЛИЕНТА)
  access_url: string // эндпоинт на который бекенд делает запрос для обмена временного code на постоянный token (ДЛЯ БЕКЕНДА)
  profile_url: string // адрес с которого получим данные пользователя Google | Github (id, email, name, picture)
  scopes: string[] // массив ключевых слов прав доступа, которые запрашиваем ['user:email']
  client_id: string // уникальный id приложения из личного кабинета google | github
  client_secret: string // уникальный секрет из личного кабинета google | github
}

/**
 * Информация о пользователе, полученная от OAuth-провайдера.
 *
 * Этот тип описывает структуру данных, содержащую информацию о пользователе,
 * включая токены доступа и информацию о провайдере.
 */
export type TypeUserInfo = {
  id: string
  picture: string
  name: string
  email: string
  access_token?: string | null
  refresh_token?: string
  expires_in?: number
  provider: string
}

export type ExtractedUserInfo = Pick<TypeUserInfo, 'id' | 'email' | 'name' | 'picture'>;

/**
 * Определяем формат ответа при запросе токена для Google
 */
export type GoogleTokenResponse = {
  /** Токен, который ваше приложение отправляет для авторизации запроса к API Google. */
  access_token: string

  /** Оставшийся срок действия токена доступа в секундах. */
  expires_in: number

  /**
   * Токен для получения нового access_token.
   * Присутствует только если при запросе кода был передан параметр access_type=offline.
   */
  refresh_token?: string

  /**
   * Оставшийся срок действия токена обновления в секундах.
   * Возвращается только если пользователь предоставил доступ, ограниченный по времени.
   */
  refresh_token_expires_in?: number

  /** Области доступа, предоставляемые access_token, разделенные пробелами. */
  scope: string

  /** Тип токена. Обычно "Bearer". */
  token_type: 'Bearer'
}

/**
 * Определяем формат ответа при запросе токена для Github
 */
export type GithubTokenResponse = {
  access_token: string
  expires_in: number
  refresh_token?: string
  refresh_token_expires_in?: number
  scope: string
  token_type: 'Bearer'
}

/**
 * Определяем формат ответа при запросе информации пользователя для Google
 */
export type GoogleUserInfoResponse = {
  /**
   * Обязательный параметр. Идентификатор пользователя, уникальный для всех
   * учетных записей Google и никогда не используемый повторно.
   * Строка с учетом регистра, не превышающая 255 символов.
   */
  sub: string

  /** Полное имя пользователя в отображаемом виде. */
  name? : string

  /** Имя пользователя (или имя). */
  given_name? : string

  /** Фамилия пользователя. */
  family_name? : string

  /** URL-адрес фотографии профиля пользователя. */
  picture? : string

  /** Адрес электронной почты пользователя. */
  email? : string

  /** Проверен ли адрес электронной почты пользователя. */
  email_verified? : boolean

  /** Домен, размещенный в Google Workspace или облачной среде пользователя. */
  hd? : string
}

/**
 * Определяем формат ответа при запросе информации пользователя для Github
 */
export type GithubUserInfoResponse = {
  id: number
  login: string
  avatar_url: string
  email: string | null
  name: string | null
  total_private_repos?: number
}

export type OAuthTokenResponse = GoogleTokenResponse | GithubTokenResponse;
export type OAuthUserInfoResponse = GoogleUserInfoResponse | GithubUserInfoResponse;
