import {todoApi} from "@/services/todo-service.ts";
import {authApi} from "@/services/auth-service.ts";
import {profileApi} from "@/services/profile-service.ts";
// import {oauthApi} from "@/services/oauth-service.ts";


export const Api = {
  todo: todoApi,
  auth: authApi,
  profile: profileApi,
  // oauth: oauthApi
}