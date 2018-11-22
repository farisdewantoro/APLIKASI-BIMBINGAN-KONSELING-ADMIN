import axios from 'axios';
import { GET_LAST_KODEPERTANYAAN, LOADING_CREATE_PERTANYAAN, SET_NEW_PERTANYAAN, GET_ALL_PERTANYAAN} from './types';

export const getLastCode = () => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.get('/api/konsultasi/pertanyaan/lastkode')
        .then(res=>{
            disbatch({
                type: GET_LAST_KODEPERTANYAAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response)
        });
}

export const setNewPertanyaan = (dataPertanyaan,history) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.post('/api/konsultasi/pertanyaan/create',dataPertanyaan)
        .then(res=>{
            disbatch({
                type: SET_NEW_PERTANYAAN
            });
            history.push('/pertanyaan/list');
        });
}

export const getAllPertanyaan = () => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.get('/api/konsultasi/pertanyaan')
        .then(res=>{
            disbatch({
                type: GET_ALL_PERTANYAAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        });
}



export const loadingPertanyaan = () =>{
    return {
        type: LOADING_CREATE_PERTANYAAN
    }
}
