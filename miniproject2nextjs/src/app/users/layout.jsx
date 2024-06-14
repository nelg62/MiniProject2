import { theme } from "../../../themes/makingStyles";

export default function PageLayout({ children }) {
  return <main style={theme}>{children}</main>;
}
