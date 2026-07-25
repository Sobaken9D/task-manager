import {ResetPasswordForm} from "@/components/shared";
import {Title} from "@/components/shared/title.tsx";

export const ResetPasswordPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <Title
            size="lg"
            text="Create new password"
            className="font-bold"
          />
          <p className="text-inactive-filter">Your new password must be different from previously used passwords</p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}