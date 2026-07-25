import {Router} from "express";
import {todoRouter} from "./todo-route";
import {authRouter} from "./auth-route";
import {profileRouter} from "./profile-route";
import {oauthRouter} from "./auth-oauth-route";

export const mainRouter = Router();

mainRouter.use('/auth', authRouter); // Все роуты внутри будут начинаться с /api/auth
mainRouter.use('/auth/oauth', oauthRouter); // Все роуты внутри будут начинаться с /api/auth/oauth

mainRouter.use('/profile', profileRouter); // Все роуты внутри будут начинаться с /api/user

mainRouter.use('/todo', todoRouter); // Все роуты внутри будут начинаться с /api/todo
