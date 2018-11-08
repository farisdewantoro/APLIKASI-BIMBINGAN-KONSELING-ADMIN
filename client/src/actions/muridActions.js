import axios from 'axios';
import { GET_ERRORS, GET_ALL_MURID } from './types';

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