// Опции, необходимые для создания Google провайдера (без захардкоженных URL и имени)
import {
  type ExtractedUserInfo,
  type GoogleUserInfoResponse,
  type TypeBaseProviderOptions
} from "../../../types/oauth";
import {BaseOAuthService} from "./base-oauth-service";


/**
 * Провайдер для работы с OAuth Google.
 */
export class GoogleProvider extends BaseOAuthService {
  constructor(options: TypeBaseProviderOptions) {
    super({
      name: 'google',
      authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      access_url: 'https://oauth2.googleapis.com/token',
      profile_url: 'https://openidconnect.googleapis.com/v1/userinfo',
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret
    });
  }

  /**
   * Извлекает и приводимые к общему виду данные профиля Google.
   */
  protected override async extractUserInfo(
    data: GoogleUserInfoResponse
  ): Promise<ExtractedUserInfo> {
    return {
      id: data.sub, // В Google идентификатором является поле 'sub'
      email: data.email ?? '',
      name: data.name ?? '',
      picture: data.picture ?? ''
    };
  }
}