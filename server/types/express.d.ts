import 'express-session';
import {ConfirmationDto} from "../../src/services/dto/auth-dto";

// Расширение встроенных типов

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      }
      dto?: ConfirmationDto
    }
  }
}