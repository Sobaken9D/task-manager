import {BaseOAuthService} from "./base-oauth-service";
import {GoogleProvider} from "./google-oauth-service";
import {GithubProvider} from "./github-oauth-service";
import {NotFoundError} from "../../../../shared/utils/errors";

export class ProviderService {
  private readonly providers: Map<string, BaseOAuthService> = new Map();

  constructor() {
    // Инициализируем Google
    const google = new GoogleProvider({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      scopes: ['openid', 'email', 'profile']
    } as any);

    // Инициализируем GitHub
    const github = new GithubProvider({
      client_id: process.env.GITHUB_CLIENT_ID || '',
      client_secret: process.env.GITHUB_CLIENT_SECRET || '',
      scopes: ['user:email', 'read:user']
    } as any);

    this.providers.set(google.name, google);
    this.providers.set(github.name, github);
  }

  public getProvider(providerName: string, baseUrl: string): BaseOAuthService {
    const provider = this.providers.get(providerName);

    if (!provider) {
      throw new NotFoundError(`OAuth provider ${providerName} not found`);
    }

    // Проставляем BASE_URL бэкенда для формирования callback URL
    provider.baseUrl = baseUrl;
    return provider;
  }
}

export const providerService = new ProviderService();