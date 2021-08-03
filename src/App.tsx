import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContext } from "./contexts/ThemeContext";

import { AdminRoom } from "./pages/AdminRoom/adminRoom";
import { Home } from "./pages/Home/home";
import { NewRoom } from "./pages/NewRoom/newroom";
import { Room } from "./pages/Room/room";

import { GlobalStyle } from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContext>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" exact component={Room} />

            <Route path="/rooms/admin/:id" exact component={AdminRoom} />
          </Switch>
        </ThemeContext>
      </AuthContextProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
