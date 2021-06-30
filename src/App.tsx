import {BrowserRouter, Route, Switch } from 'react-router-dom'
import {AuthContextProvider} from './contexts/AuthContext'
import {ThemeContext} from './contexts/ThemeContext'


import { AdminRoom } from './pages/adminRoom'
import {Home} from './pages/home'
import {NewRoom} from './pages/newroom'
import {Room} from './pages/room'


import './styles/global.scss'


function App() {

 

  return (
    <BrowserRouter>
     <AuthContextProvider>
       <ThemeContext>
      <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/rooms/new" exact component={NewRoom}/>
       <Route path="/rooms/:id" exact component={Room}/>

       <Route path="/rooms/admin/:id" exact component={AdminRoom} />
      </Switch>
      </ThemeContext>
     </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
