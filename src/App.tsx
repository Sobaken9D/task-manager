import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PATHS} from "@/constants/paths.ts";
import {
  AuthLayout,
  MainLayout,
  ProfileLayout
} from "@/components/shared/layout";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  TodoPage,
  EmailConfirmationPage,
  UnauthorizedPage,
  NotFoundPage,
  ErrorPage,
  ProfilePage,
  SettingsPage,
  ResetPasswordPage,
  ForgotPasswordPage
} from "@/pages";
import {HydrateFallback} from "@/components/shared";
import {todoLoader} from "@/lib/loaders/todo-loader.ts";
import {
  emailTokenLoader,
  resetPasswordLoader
} from "@/lib/loaders/token-loader.ts";
import {requireAuth, requireGuest} from "@/lib/middlewares/auth-middleware.ts";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    HydrateFallback: HydrateFallback,
    children: [
      {
        path: PATHS.HOME,
        element: <HomePage />,
        loader: () => null,
      },
      {
        path: PATHS.TODO,
        element: <TodoPage />,
        loader: todoLoader,
        middleware: [requireAuth(PATHS.LOGIN)]
      },
      {
        path: PATHS.AUTH,
        element: <AuthLayout />,
        children: [
          {
            path: PATHS.LOGIN,
            element: <LoginPage />,
            loader: () => null,
            middleware: [requireGuest()]
          },
          {
            path: PATHS.REGISTER,
            element: <RegisterPage />,
            loader: () => null,
            middleware: [requireGuest(PATHS.SETTINGS)],
          },
          {
            path: PATHS["EMAIL-CONFIRMATION"],
            element: <EmailConfirmationPage />,
            loader: emailTokenLoader,
          },
          {
            path: PATHS["FORGOT-PASSWORD"],
            element: <ForgotPasswordPage />,
            loader: () => null,
          },
          {
            path: PATHS["RESET-PASSWORD"],
            element: <ResetPasswordPage />,
            loader: resetPasswordLoader,
          },
        ]
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: PATHS.PROFILE,
            element: <ProfilePage />,
            loader: () => null,
            middleware: [requireAuth(PATHS.LOGIN)]
          },
          {
            path: PATHS.SETTINGS,
            element: <SettingsPage />,
            loader: () => null,
            middleware: [requireAuth(PATHS.LOGIN)]
          },
        ]
      },
      {
        path: PATHS["NON-AUTH"],
        element: <UnauthorizedPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider
      router={router}
    />
  )
}

export default App;
