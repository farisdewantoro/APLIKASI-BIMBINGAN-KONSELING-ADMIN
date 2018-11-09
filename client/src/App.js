import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentAdmin, logoutAdmin } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import Penjurusan from './components/pages/Penjurusan';
import PenjurusanCreate from './components/pages/PenjurusanCreate';
import DataPenjurusanSiswa from './components/pages/DataPenjurusanSiswa';
import RapotSiswa from './components/pages/RapotSiswa/RapotSiswa';
import ProfileAdmin from './components/pages/ProfileAdmin';
import DataSiswaCreate from './components/pages/DataSiswaCreate';
import Rapot from './components/pages/RapotSiswa/Rapot';
import './App.css';

// Check for token 
if(localStorage.jwtToken){
    // set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get admin info experid
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set admin and isAuthenticated
  store.dispatch(setCurrentAdmin(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    // Logout Admin
    store.dispatch(logoutAdmin());
    // TODO:Clear current profile
    // Redirect to login
    window.location.href = '/login';
  }

}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <Switch>
       <Route path="/login" component={Login} />  
        <MainLayout>
          <Switch>
              <PrivateRoute path="/" exact component={Dashboard} />
              <PrivateRoute path="/penjurusan" exact  component={Penjurusan} />
                <PrivateRoute path="/penjurusan/create" exact component={PenjurusanCreate} />
                <PrivateRoute path="/datapenjurusansiswa" exact component={DataPenjurusanSiswa} />
                <PrivateRoute path="/rapotsiswa" exact component={RapotSiswa}/> 
              <PrivateRoute path="/profileadmin" exact component={ProfileAdmin}/> 
                <PrivateRoute path="/datasiswa/create" exact component={DataSiswaCreate}/>
                <PrivateRoute path="/rapotsiswa/:nis" exact component={Rapot}/>
          </Switch>
        </MainLayout>
      </Switch>
      </Router>
      </Provider>
    );
  }
}

export default App;
