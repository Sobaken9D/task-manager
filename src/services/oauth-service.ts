// import {AbstractService} from "@/services/abstract-service.ts";
// import {axiosInstance} from "@/services/axios-instance.ts";
//
// class OauthService extends AbstractService {
//   constructor() {
//     super('/auth/oauth');
//   }
//
//   /**
//    * Делает get запрос к провайдеру для авторизации.
//    * @param providerName - имя провайдера ("google" | "github").
//    * @returns Перенаправление для следующего этапа авторизации.
//    */
//   public async oauth(providerName: string) {
//     try {
//       const {data} = await axiosInstance.get(
//         `${this.url}/connect/${providerName.toLowerCase()}`
//       );
//       return data;
//     } catch (error) {
//       this.handleError(error, 'OAUTH_GOOGLE');
//     }
//   }
// }
//
// export const oauthApi = new OauthService();