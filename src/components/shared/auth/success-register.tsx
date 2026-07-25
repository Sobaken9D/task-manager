import {Link} from "react-router-dom";
import {PATHS} from "@/constants/paths.ts";
import {Button} from "@/components/ui";

interface Props {
  registeredEmail: string | null
}

export const SuccessRegister = ({registeredEmail}: Props) => {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-6 bg-secondary/20 rounded-lg">
      <div className="text-4xl">✉️</div>
      <h2 className="text-xl font-semibold">Confirm your email</h2>
      <p className="text-sm text-muted-foreground">
        We have sent a verification link to <span className="font-bold">{registeredEmail}</span>.
        Please check your inbox (and spam folder) to activate your account.
      </p>
      <Link to={PATHS.LOGIN} className="w-full mt-2">
        <Button className="w-full">Go to Sign In</Button>
      </Link>
    </div>
  );
}