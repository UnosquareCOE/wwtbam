import { Route, Routes, Navigate } from "react-router-dom";
import NavigationRoutes from "./constants/routes";
import { AuthContext } from "./context";

import LoginScreen from "./pages/LogIn/LoginScreen";
import Dashboard from "./pages/Dashboard/Dashboard";
import GameLobby from "./pages/GameLobby/GameLobby";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "./styles/ThemeOptions";
import Main from "./pages/Rounds/Main/Main";
import FastestFinger from "./pages/Rounds/FastestFinger/FastestFinger";

const unauthorisedRoutes = () => {
  return (
    <>
      <Route path={NavigationRoutes.Login} element={<LoginScreen />} />
      <Route path="*" element={<Navigate to={NavigationRoutes.Login} />} />
    </>
  );
};

const authorisedRoutes = () => {
  return (
    <>
      <Route path={NavigationRoutes.Dashboard} element={<Dashboard />} />
      <Route path={NavigationRoutes.Lobby} element={<GameLobby />} />
      <Route path={NavigationRoutes.mainGame} element={<Main />} />
      <Route
        path={NavigationRoutes.fastestFinger}
        element={<FastestFinger />}
      />
      <Route path="*" element={<Navigate to={NavigationRoutes.Dashboard} />} />
    </>
  );
};
function App() {
  const { state } = AuthContext.useLogin();
  const loggedIn = state.accessToken;
  const theme = createTheme(themeOptions);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          {!loggedIn && unauthorisedRoutes()}
          {loggedIn && authorisedRoutes()}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
