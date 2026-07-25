import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui";
import toast from "react-hot-toast";
import {FormErrorMessage, FormInput} from "@/components/shared";
import {
  type AuthError,
  clearAuthError,
  resetPassword
} from "@/store/features/authSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {useEffect} from "react";
import {
  formResetPasswordSchema,
  type TFormResetPasswordValues
} from "@/shared/schemas/auth-schema.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import {PATHS} from "@/constants/paths.ts";

export const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.auth);
  const { token } = useLoaderData<{ token: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const form = useForm<TFormResetPasswordValues>({
    resolver: zodResolver(formResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: TFormResetPasswordValues) => {
    const resultAction = await dispatch(resetPassword({
      form: data,
      token: token
    }));

    console.log(resultAction);

    // match - метод из Redux для сравнение полей type
    if (resetPassword.fulfilled.match(resultAction)) {
      toast.success('You have successfully reset password');

      navigate(PATHS.LOGIN, { replace: true });
    } else {
      const payloadError = resultAction.payload as AuthError;
      const serverMessage = payloadError?.message || resultAction.error.message || 'Could not reset password';

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
          name="password"
          label="Password"
          type="password"
          disabled={form.formState.isSubmitting}
          placeholder="Enter new password"
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

        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          className="w-full mt-4"
        >
          Reset password
        </Button>

        {error && (
          <FormErrorMessage errorMessage={error.message} />
        )}
      </form>
    </FormProvider>
  );
};