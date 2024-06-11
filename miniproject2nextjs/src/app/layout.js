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
        <UserProvider>
          <ThemeProvider theme={theme}>
            <Container>
              <ResponsiveAppBar />
              {children}
            </Container>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
