import {useLoaderData, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { InfoBlock } from "@/components/shared";

export const EmailConfirmationPage = () => {
  const navigate = useNavigate();

  // Сюда мы попадём, ТОЛЬКО если лоадер выполнился успешно.
  // Если была ошибка — React Router сам переключится на ErrorBoundary.
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <InfoBlock
        title="Email Verified Successfully!"
        text="You will be redirected to the home page shortly."
        firstButtonText="Home"
        firstButtonLink="/"
        secondButtonIsVisible={false}
      />
    </div>
  );
};