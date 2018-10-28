import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'; 
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import Penjurusan from './components/pages/Penjurusan';
import PenjurusanCreate from './components/pages/PenjurusanCreate';
import DataPenjurusanSiswa from './components/pages/DataPenjurusanSiswa';
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
          </Switch>
        </MainLayout>
      </Switch>
      </Router>
    );
  }
}

export default App;
