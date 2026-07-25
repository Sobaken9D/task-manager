import {ForgotPaswordForm} from "@/components/shared";
import {Title} from "@/components/shared/title.tsx";

export const ForgotPasswordPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <Title
            size="lg"
            text="Forgot password?"
            className="font-bold"
          />
          <p className="text-inactive-filter">Enter your email address and we'll send you a link to reset your password</p>
        </div>

        <ForgotPaswordForm />
      </div>
    </div>
  );
}