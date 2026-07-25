import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui";
import toast from "react-hot-toast";
import {FormErrorMessage, FormInput} from "@/components/shared";
import {
  type AuthError,
  clearAuthError, forgotPassword
} from "@/store/features/authSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {useEffect} from "react";
import {
  formForgotPasswordSchema,
  type TFormForgotPasswordValues
} from "@/shared/schemas/auth-schema.ts";


export const ForgotPaswordForm = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const form = useForm<TFormForgotPasswordValues>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = async (data: TFormForgotPasswordValues) => {
    const resultAction = await dispatch(forgotPassword(data));

    console.log(resultAction);

    // match - метод из Redux для сравнение полей type
    if (forgotPassword.fulfilled.match(resultAction)) {
      toast.success('You have successfully send email for reset password');
    } else {
      const payloadError = resultAction.payload as AuthError;

      const serverMessage = payloadError?.message || resultAction.error.message || 'Could not send email';

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

        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          className="w-full mt-4"
        >
          Send email
        </Button>

        {error && (
          <FormErrorMessage errorMessage={error.message} />
        )}
      </form>
    </FormProvider>
  );
};