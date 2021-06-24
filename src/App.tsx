import {BrowserRouter, Route, Switch } from 'react-router-dom'
import {AuthContextProvider} from './contexts/AuthContext'
import {Home} from './pages/home'
import {NewRoom} from './pages/newroom'
import {Room} from './pages/room'
import './styles/global.scss'





function App() {

 

  return (
    <BrowserRouter>
     <AuthContextProvider>
      <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/rooms/new" component={NewRoom}/>
       <Route path="/:id" component={Room}/>
      </Switch>
     </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
