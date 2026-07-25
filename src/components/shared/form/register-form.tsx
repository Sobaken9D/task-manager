import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui";
import toast from "react-hot-toast";
import {FormErrorMessage, FormInput} from "@/components/shared";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {
  type AuthError,
  clearAuthError,
  registerUser
} from "@/store/features/authSlice.ts";
import {useEffect, useState} from "react";
import {
  formRegisterSchema,
  type TFormRegisterValues
} from "@/shared/schemas/auth-schema.ts";
interface RegisterFormProps {
  onSuccess: (email: string) => void; // Описываем тип пропса
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.auth);

  // const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaValue = true;
  const currentTheme = useAppSelector((state) => state.ui.theme);


  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA.');
      return;
    }

    const resultAction = await dispatch(registerUser(data));

    console.log(resultAction);

    // match - метод из Redux для сравнение полей type
    if (registerUser.fulfilled.match(resultAction)) {
      toast.error('Registration successful 📝. Confirm your email', {
        icon: '✅',
      });

      onSuccess(data.email);
    } else {
      const payloadError = resultAction.payload as AuthError;

      const serverMessage = payloadError?.message || resultAction.error.message || 'Registration failed.';

      form.setValue('password', '');
      form.setValue('confirmPassword', '');

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
        <FormInput
          name="email"
          label="E-Mail"
          disabled={form.formState.isSubmitting}
          placeholder="Enter your email"
          required
        />
        <FormInput
          name="name"
          label="Your name"
          disabled={form.formState.isSubmitting}
          placeholder="Enter your name"
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
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          disabled={form.formState.isSubmitting}
          placeholder="Confirm password"
          required
        />

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
          Sign up
        </Button>

        {error && (
          <FormErrorMessage errorMessage={error.message} />
        )}
      </form>
    </FormProvider>
  );
}