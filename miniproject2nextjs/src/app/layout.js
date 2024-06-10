import "./globals.css";
import { Inter } from "next/font/google";
import ResponsiveAppBar from "@/components/AppBar";
import { UserProvider } from "@/context/UserContext";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../themes/makingStyles";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <ThemeProvider theme={theme}>
            <ResponsiveAppBar />
            <UserProvider>{children}</UserProvider>
          </ThemeProvider>
        </Container>
      </body>
    </html>
  );
}
