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
// import Penjurusan from './components/pages/Penjurusan';
// import PenjurusanCreate from './components/pages/PenjurusanCreate';
import DataPenjurusanSiswa from './components/pages/DataPenjurusanSiswa';
import RapotSiswa from './components/pages/RapotSiswa/RapotSiswa';
import ProfileAdmin from './components/pages/ProfileAdmin';
import DataSiswaCreate from './components/pages/DataSiswaCreate';
import Rapot from './components/pages/RapotSiswa/Rapot';
import RapotSemester from './components/pages/RapotSiswa/RapotSemester';
// import KelolaRapotSiswa from './components/pages/RapotSiswa/KelolaRapotSiswa';
import './App.css';
import ShowRapotSiswa from './components/pages/RapotSiswa/ShowRapotSiswa';
import Pertanyaan from './components/pages/Pertanyaan/Pertanyaan';
import CreatePertanyaan from './components/pages/Pertanyaan/CreatePertanyaan';
import Jurusan from './components/pages/Jurusan/Jurusan';
import CreateJurusan from './components/pages/Jurusan/CreateJurusan';
import Konsultasi from './components/pages/Konsultasi/Konsultasi';
import NilaiRapotPDF from './components/pdf/NilaiRapotPDF';

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
        <PrivateRoute path="/rapot/siswa/PDF" exact component={NilaiRapotPDF} />
        <MainLayout>
          <Switch>
            
              <PrivateRoute path="/" exact component={Dashboard} />
              {/* <PrivateRoute path="/penjurusan" exact  component={Penjurusan} />
                <PrivateRoute path="/penjurusan/create" exact component={PenjurusanCreate} /> */}
                <PrivateRoute path="/datapenjurusansiswa" exact component={DataPenjurusanSiswa} />
                <PrivateRoute path="/rapotsiswa" exact component={RapotSiswa}/> 
                <PrivateRoute path="/profileadmin" exact component={ProfileAdmin}/> 
                <PrivateRoute path="/datasiswa/create" exact component={DataSiswaCreate}/>
                <PrivateRoute path="/rapotsiswa/:nis" exact component={Rapot}/>
                <PrivateRoute path="/rapotsiswa/:nis/:kelas/:semester" exact component={RapotSemester}/>
                <PrivateRoute path="/rapotsiswa/data/:nis/:kelas/:semester" exact component={ShowRapotSiswa}/>
                <PrivateRoute path="/pertanyaan/list" exact component={Pertanyaan} />
                <PrivateRoute path="/pertanyaan/create" exact component={CreatePertanyaan}/>
                <PrivateRoute path="/pertanyaan/edit/:kodeSoal" exact component={CreatePertanyaan} />
                <PrivateRoute path="/jurusan" exact component={Jurusan}/>
                <PrivateRoute path="/jurusan/create" exact component={CreateJurusan} />
                <PrivateRoute path="/konsultasi" exact component={Konsultasi} />
                <PrivateRoute path="/jurusan/edit/:_id" exact component={CreateJurusan}/>
                
          </Switch>
        </MainLayout>
        
      </Switch>
      </Router>
      </Provider>
    );
  }
}

export default App;
