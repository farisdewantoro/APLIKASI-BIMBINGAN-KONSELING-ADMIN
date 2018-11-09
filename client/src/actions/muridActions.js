import axios from 'axios';
import { GET_ERRORS, GET_ALL_MURID, RAPOT_MURID_LOADING,GET_RAPOT_MURID } from './types';

// export const createNewMurid = (dataMurid,history) => disbatch =>{
//     axios.post('/api/murids/datasiswa/create',dataMurid)
//         .then(res =>
//             history.push('/rapotsiswa')
//         )
//         .catch(err=>
//             disbatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         );

// }

export const getRapotMurid = (nis) => disbatch =>{
    axios.get('/api/murids/datasiswa/rapot/'+nis)
    
        .then(res=>{
            disbatch({
                type: GET_RAPOT_MURID,
                payload:res.data
            })
        })
        .catch(err => {
            disbatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const createNewMurid = (dataMurid,foto, history) => disbatch => {
    let url = '/api/murids/datasiswa/create';
    let config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let data = new FormData();
    let newMurid = JSON.stringify(dataMurid);
    data.append('fotoDisplay',foto);
    data.append('newMurid',newMurid);
    axios(
        {
            data: data,
            method: 'post',
            url:url,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
        .then(res =>
            history.push('/rapotsiswa')
        )
        .catch(err =>
            disbatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

}

export const getAllMurid = () => dispatch =>{
    dispatch(setRapotLoading());
    axios.get('/api/murids/datasiswa/all')
        .then(res=>
            dispatch({
                type:GET_ALL_MURID,
                payload:res.data
            })
            )
        .catch(err =>
            dispatch({
                type:GET_ALL_MURID,
                payload:{}
            })
            )
}

// Loading Get Rapot siswa
export const setRapotLoading = () =>{
    return{
        type:RAPOT_MURID_LOADING
    }
}