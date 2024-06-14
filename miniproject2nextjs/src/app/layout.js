import "./globals.css";
import { Inter } from "next/font/google";
import ResponsiveAppBar from "@/components/AppBar";
import { UserProvider } from "@/context/UserContext";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../themes/makingStyles";

// Set default fonts
const inter = Inter({ subsets: ["latin"] });

// RootLayout component wrap all pages with providers
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* UserProvider to manage states from UserContext.jsx */}
        <UserProvider>
          {/* ThemeProvider to apply default theme from makingStyles.jsx  */}
          <ThemeProvider theme={theme}>
            <Container>
              {/* ResponsiveAppBar to provide navigation bar on all pages AppBar.jsx file */}
              <ResponsiveAppBar />
              {/* Render children components */}
              {children}
            </Container>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
