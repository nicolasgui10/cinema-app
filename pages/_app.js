import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "../styles/themes";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* Passa a função de alternância como prop para as páginas */}
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
