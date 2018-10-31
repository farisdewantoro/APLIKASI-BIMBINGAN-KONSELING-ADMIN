import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentAdmin, logoutAdmin } from './actions/authActions';

import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import Penjurusan from './components/pages/Penjurusan';
import PenjurusanCreate from './components/pages/PenjurusanCreate';
import DataPenjurusanSiswa from './components/pages/DataPenjurusanSiswa';
import RapotSiswa from './components/pages/RapotSiswa';
import ProfileAdmin from './components/pages/ProfileAdmin';
import DataSiswaCreate from './components/pages/DataSiswaCreate';
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
              <Route path="/" exact component={Dashboard} />
              <Route path="/penjurusan" exact  component={Penjurusan} />
              <Route path="/penjurusan/create" component={PenjurusanCreate} />
              <Route path="/datapenjurusansiswa" component={DataPenjurusanSiswa} />
              <Route path="/rapotsiswa" component={RapotSiswa}/> 
              <Route path="/profileadmin" component={ProfileAdmin}/> 
              <Route path="/datasiswa/create" component={DataSiswaCreate}/>
          </Switch>
        </MainLayout>
      </Switch>
      </Router>
      </Provider>
    );
  }
}

export default App;
