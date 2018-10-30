import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'; 
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import Penjurusan from './components/pages/Penjurusan';
import PenjurusanCreate from './components/pages/PenjurusanCreate';
import DataPenjurusanSiswa from './components/pages/DataPenjurusanSiswa';
import RapotSiswa from './components/pages/RapotSiswa';
import './App.css';
class App extends Component {
  render() {
    return (
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
          </Switch>
        </MainLayout>
      </Switch>
      </Router>
    );
  }
}

export default App;
