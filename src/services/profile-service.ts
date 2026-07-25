import {AbstractService} from "@/services/abstract-service.ts";
import type {UserResponseDto} from "@/services/dto/user-dto.ts";
import {axiosInstance} from "@/services/axios-instance.ts";
import type {
  TFormDeleteAccountValues,
  TFormUpdateSettingsValues
} from "@/shared/schemas/auth-schema.ts";

class ProfileService extends AbstractService {
  constructor() {
    super('/profile');
  }

  /**
   * Делает patch запрос на сервер для смены пароля.
   * @param dto - объект с данными формы настроек.
   * @returns Объект с сообщением об успешном входе и дополнительные данные.
   */
  public async updateSettings(dto: TFormUpdateSettingsValues): Promise<UserResponseDto> {
    try {
      const {data} = await axiosInstance.patch<UserResponseDto>(
        `${this.url}/update-settings`,
        dto
      );

      return data;
    } catch (error) {
      this.handleError(error, 'UPDATE_SETTINGS');
    }
  }

  /**
   * Делает post запрос на сервер для удаления юзера.
   * @param dto - Объект с текущим паролем для подтверждения удаления.
   * @returns Объект с сообщением об успешном входе и дополнительные данные.
   */
  public async deleteUser(dto: TFormDeleteAccountValues): Promise<UserResponseDto> {
    try {
      const {data} = await axiosInstance.post<UserResponseDto>(
        `${this.url}/delete-user`,
        dto
      );

      return data;
    } catch (error) {
      this.handleError(error, 'DELETE_USER');
    }
  }
}

export const profileApi = new ProfileService();