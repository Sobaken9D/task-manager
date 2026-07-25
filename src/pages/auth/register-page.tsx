import {RegisterForm} from "@/components/shared";
import {Button} from "@/components/ui/button.tsx";
import {Title} from "@/components/shared/title.tsx";
import {Link} from "react-router-dom";
import {PATHS} from "@/constants/paths.ts";
import {useState} from "react";
import {AuthSocial, SuccessRegister} from "@/components/shared/auth";

export const RegisterPage = () => {
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  if (registeredEmail) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col gap-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <SuccessRegister registeredEmail={registeredEmail} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <Title
            size="lg"
            text="Sign up"
            className="font-bold"
          />
          <p className="text-inactive-filter">Enter your details below to create your account and get started</p>
        </div>

        <AuthSocial/>

        
        <div className="flex items-center text-inactive-filter before:flex-1 before:border-b before:mr-3 after:flex-1 after:border-b after:ml-3">
          or
        </div>

        <RegisterForm onSuccess={(email) => setRegisteredEmail(email)} />

        <div className="flex flex-col items-center justify-center gap-2 text-sm">
          <Link
            to={PATHS.LOGIN}
            className="font-semibold text-inactive-filter hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>

    </div>
  );
}