import Link from "next/link";
import SignUp from "@/components/LoginPage";

export default function Login() {
  return (
    <div className="Login">
      <h1>Login</h1>
      <p>
        Please Login Here <Link href="/">home</Link>.
      </p>
      {/* LoginPage component */}
      <SignUp></SignUp>
    </div>
  );
}
