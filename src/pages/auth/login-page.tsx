import {LoginForm} from "@/components/shared/form/login-form.tsx";
import {Title} from "@/components/shared/title.tsx";
import {Link} from "react-router-dom";
import {PATHS} from "@/constants/paths.ts";
import {AuthSocial} from "@/components/shared/auth";

export const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <Title
            size="lg"
            text="Sign in"
            className="font-bold"
          />
          <p className="text-inactive-filter">Enter your email and password to login to the site</p>
        </div>

        <AuthSocial/>

        <div className="flex items-center text-inactive-filter before:flex-1 before:border-b before:mr-3 after:flex-1 after:border-b after:ml-3">
          or
        </div>

        <LoginForm />

        <div className="flex flex-col items-center justify-center gap-2 text-sm">
          <Link
            to={PATHS.REGISTER}
            className="font-semibold text-inactive-filter hover:underline"
          >
            Don't have an account yet? Sign up
          </Link>

          <Link
            to={PATHS["FORGOT-PASSWORD"]}
            className="font-semibold text-inactive-filter hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

    </div>
  );
}