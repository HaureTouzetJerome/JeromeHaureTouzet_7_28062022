import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import ManagePost from "./Pages/ManagePost/ManagePost";
import Error from "./Pages/Error/Error";
import routes from "./config/routes";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter className="app">
      <Navbar />
      <Switch>
        <Route exact path={routes.HOME} component={Home} />
        <Route path={routes.MANAGE_POST} component={ManagePost} />
        <Route path={routes.AUTH} component={Auth} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
