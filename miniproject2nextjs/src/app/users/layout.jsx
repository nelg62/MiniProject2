import { theme } from "../../../themes/makingStyles";
import styles from "../page.module.css";

export default function PageLayout({ children }) {
  return <main style={theme}>{children}</main>;
}
