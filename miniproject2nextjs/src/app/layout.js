import "./globals.css";
import { Inter } from "next/font/google";
import ResponsiveAppBar from "@/components/AppBar";
import { UserProvider } from "@/context/UserContext";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../themes/makingStyles";

// set default fonts
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* UserProvider for context using UserContext.jsx file */}
        <UserProvider>
          {/* ThemeProvider to be able to use a default theme and provide from makingStyles.jsx  */}
          <ThemeProvider theme={theme}>
            <Container>
              {/* navigation bar placed here to show on all pages called AppBar.jsx file */}
              <ResponsiveAppBar />
              {children}
            </Container>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
