import CheckboxListSecondary from "@/components/UserList";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import { UserStyles } from "../../../themes/makingStyles";

export default function Users() {
  return (
    <div className="Users">
      <h1>Users</h1>
      <p>
        This Page shows Users <Link href="/">home</Link>.
      </p>
      <ThemeProvider theme={UserStyles}>
        <CheckboxListSecondary />
      </ThemeProvider>
    </div>
  );
}
