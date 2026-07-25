import {AbstractService} from "@/services/abstract-service.ts";
import type {
  AuthResponseDto,
  ConfirmationDto,
} from "@/services/dto/auth-dto.ts";
import {axiosInstance} from "@/services/axios-instance.ts";
import type {
  TFormForgotPasswordValues,
  TFormLoginValues,
  TFormRegisterValues, TFormResetPasswordValues
} from "@/shared/schemas/auth-schema.ts";


class AuthService extends AbstractService {
  constructor() {
    super('/auth');
  }

  /**
   * Запрашивает данные текущего пользователя на основе куки сессии.
   * Нужен для middleware-auth.
   * @returns Объект с сообщением об успешном получении сессии и данными пользователя в поле data.
   */
  public async checkAuth(): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.get<AuthResponseDto>(
        `${this.url}/check-auth`
      );
      return data;
    } catch (error) {
      this.handleError(error, 'CHECK_AUTH');
    }
  }

  /**
   * Делает post запрос на сервер для подтверждения токена для верификации почты.
   * @param dto - объект с данными (токен) для подтверждения почты.
   * @returns Объект с сообщением об успешном подтверждении почты и данными сессии в поле data.
   */
  public async verifyEmail(dto: ConfirmationDto): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.post<AuthResponseDto>(
        `${this.url}/email-confirmation`,
        dto
      );

      return data;
    } catch (error) {
      this.handleError(error, 'VERIFY_EMAIL');
    }
  }

  /**
   * Делает post запрос на сервер для регистрации нового пользователя.
   * @param dto - объект с данными формы регистрации.
   * @returns Объект с сообщением об успешной регистрации и дополнительные данные.
   */
  public async registerUser(dto: TFormRegisterValues): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.post<AuthResponseDto>(
        `${this.url}/register`,
        dto
      );

      return data;
    } catch (error) {
      this.handleError(error, 'REGISTER_USER');
    }
  }

  /**
   * Делает post запрос на сервер для входа пользователя.
   * @param dto - объект с данными формы логина.
   * @returns Объект с сообщением об успешном входе и дополнительные данные.
   */
  public async loginUser(dto: TFormLoginValues): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.post<AuthResponseDto>(
        `${this.url}/login`,
        dto
      );

      return data;
    } catch (error) {
      this.handleError(error, 'LOGIN_USER');
    }
  }

  /**
   * Делает post запрос на сервер для выхода пользователя.
   * @returns Объект с сообщением об успешном входе и дополнительные данные.
   */
  public async logoutUser(): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.post<AuthResponseDto>(
        `${this.url}/logout`
      );

      return data;
    } catch (error) {
      this.handleError(error, 'LOGOUT_USER');
    }
  }

  /**
   * Делает post запрос на сервер для начала смены пароля.
   * @param dto - объект с данными.
   * @param dto.email - почта пользователя.
   * @returns Объект с сообщением об успешном входе и дополнительные данные.
   */
  public async forgotPassword(dto: TFormForgotPasswordValues): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.post<AuthResponseDto>(
        `${this.url}/forgot-password`,
        dto
      );

      return data;
    } catch (error) {
      this.handleError(error, 'FORGOT_PASSWORD');
    }
  }

  /**
   * Делает post запрос на сервер для окончания смены пароля.
   * @param form - объект с данными формы смены пороля.
   * @param token - токен подтверждения.
   * @returns Объект с сообщением об успешном входе и дополнительные данные.
   */
  public async resetPassword(form: TFormResetPasswordValues, token: string): Promise<AuthResponseDto> {
    try {
      const {data} = await axiosInstance.patch<AuthResponseDto>(
        `${this.url}/reset-password`,
        {
          form,
          token
        }
      );

      return data;
    } catch (error) {
      this.handleError(error, 'RESET_PASSWORD');
    }
  }
}

export const authApi = new AuthService();