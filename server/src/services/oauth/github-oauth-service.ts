// Опции, необходимые для создания Google провайдера (без захардкоженных URL и имени)
import {
  type ExtractedUserInfo,
  type GithubUserInfoResponse,
  type TypeBaseProviderOptions
} from "../../../types/oauth";
import {BaseOAuthService} from "./base-oauth-service";


/**
 * Провайдер для работы с OAuth Google.
 */
export class GithubProvider extends BaseOAuthService {
  constructor(options: TypeBaseProviderOptions) {
    super({
      name: 'github',
      authorize_url: 'https://github.com/login/oauth/authorize',
      access_url: 'https://github.com/login/oauth/access_token',
      profile_url: 'https://api.github.com/user',
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret
    });
  }

  /**
   * Извлекает и приводимые к общему виду данные профиля Github.
   */
  protected override async extractUserInfo(
    data: GithubUserInfoResponse
  ): Promise<ExtractedUserInfo> {
    return {
      id: String(data.id),
      email: data.email ?? '',
      name: data.login ?? '',
      picture: data.avatar_url ?? ''
    };
  }
}