import axios from 'axios';
import { GET_ERRORS, GET_ALL_MURID, RAPOT_MURID_LOADING } from './types';

export const createNewMurid = (dataMurid,history) => disbatch =>{
    axios.post('/api/murids/datasiswa/create',dataMurid)
        .then(res =>
            history.push('/rapotsiswa')
        )
        .catch(err=>
            disbatch({
                type:GET_ERRORS,
                payload:err.response.data
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