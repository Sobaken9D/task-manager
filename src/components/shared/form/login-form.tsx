import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui";
import toast from "react-hot-toast";
import {FormErrorMessage, FormInput} from "@/components/shared";
import {
  type AuthError,
  clearAuthError,
  loginUser
} from "@/store/features/authSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {useEffect, useState} from "react";
import {
  formLoginSchema,
  type TFormLoginValues
} from "@/shared/schemas/auth-schema.ts";
import ReCAPTCHA from "react-google-recaptcha";
import {useNavigate, useSearchParams} from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.auth);

  // const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaValue = true;
  const currentTheme = useAppSelector((state) => state.ui.theme);

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: ''
    }
  });

  const onSubmit = async (data: TFormLoginValues) => {
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA.');
      return;
    }

    const resultAction = await dispatch(loginUser(data));

    console.log(resultAction);

    // match - метод из Redux для сравнение полей type
    if (loginUser.fulfilled.match(resultAction)) {
      const responseData = resultAction.payload?.data;

      if (responseData?.twoFactorRequired) {
        setShowTwoFactor(true);
        toast.success('Two-factor authentication code sent to your email.');
      } else {
        // Если 2FA не требуется — вход успешно завершен

        // setShowTwoFactor(false);

        toast.success('You have successfully logged into your account');

        const redirectTo = searchParams.get('redirect') || '/profile';

        // Перенаправляем пользователя туда, куда он изначально хотел
        navigate(redirectTo, { replace: true });
      }
    } else {
      const payloadError = resultAction.payload as AuthError;
      const serverMessage = payloadError?.message || resultAction.error.message || 'Could not sign in to the account.';

      form.setValue('password', '');

      toast.error(serverMessage, {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Если бэк запросил код, скрываем или блокируем поля email и password (чтобы юзер их не менял) */}
        {!showTwoFactor ? (
          <>
            <FormInput
              name="email"
              label="E-Mail"
              disabled={form.formState.isSubmitting}
              placeholder="Enter your email"
              required
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              disabled={form.formState.isSubmitting}
              placeholder="Enter your password"
              required
            />
          </>
        ) : (
          // Показываем это поле только тогда, когда showTwoFactor === true
          <FormInput
            name="code"
            label="Two-Factor Code"
            placeholder="Enter 6-digit code"
            required
          />
        )}

        {/*<div className='flex justify-center mt-4'>*/}
        {/*  <ReCAPTCHA*/}
        {/*    sitekey={*/}
        {/*      import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY as string*/}
        {/*    }*/}
        {/*    onChange={setRecaptchaValue}*/}
        {/*    theme={currentTheme === 'LIGHT' ? 'light' : 'dark'}*/}
        {/*  />*/}
        {/*</div>*/}

        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          className="w-full mt-4"
        >
          {showTwoFactor ? 'Confirm Code' : 'Sign in'}
        </Button>

        {/* Опционально: кнопка отмены, если юзер передумал или ввел не тот email */}
        {showTwoFactor && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setShowTwoFactor(false);
              form.setValue('code', '');
            }}
          >
            Back to login
          </Button>
        )}

        {error && (
          <FormErrorMessage errorMessage={error.message} />
        )}
      </form>
    </FormProvider>
  );
};