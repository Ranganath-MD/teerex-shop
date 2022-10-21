import { AppShell, ColorSchemeProvider, MantineProvider, type ColorScheme } from "@mantine/core";
import { Filters } from "../filters";
import { TeeRexHeader } from "./Header";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          header={<TeeRexHeader />}
          navbarOffsetBreakpoint="sm"
          navbar={
            location.pathname === "/" ? <Filters device="system" /> : <></>
          }
        >
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
