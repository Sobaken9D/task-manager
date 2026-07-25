import {Link} from "react-router-dom";
import {Button} from "@/components/ui";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {logoutUser} from "@/store/features/authSlice.ts";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  }

  return (
    <div className="w-full min-h-screen">
      <h1>HOME</h1>
      <div>
        <Link to="/todo">todo</Link>
      </div>
      <div>
        <Link to="/auth/login">login</Link>
      </div>
      <div>
        <Link to="/auth/register">register</Link>
      </div>
      <div>
        <Link to="/auth/email-confirmation">email-confirmation</Link>
      </div>
      <div>
        <Link to="/auth/forgot-password">forgot-password</Link>
      </div>
      <div>
        <Link to="/auth/reset-password">reset-password</Link>
      </div>
      <div>
        <Link to={`/profile`}>profile</Link>
      </div>
      <div>
        <Link to={`/profile/settings`}>settings</Link>
      </div>
      {/*<div>*/}
      {/*  <a href="http://localhost:3000/auth/oauth/connect/google">Google</a>*/}
      {/*</div>*/}
      <Button
        onClick={handleLogout}
        loading={loading}
      >
        logout
      </Button>
    </div>
  );
}

// 'PROFILE': '/profile/:id',
//   'SETTINGS': '/profile/:id/settings',