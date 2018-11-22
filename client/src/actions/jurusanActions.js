import axios from 'axios';
import { LOADING_JURUSAN, GET_ALL_JURUSAN} from './types';
import { loadingPertanyaan} from './pertanyaanActions';

export const setNewJurusan = (dataJurusan,history) => disbatch =>{
    disbatch(loadingPertanyaan());
    axios.post('/api/konsultasi/jurusan/create',dataJurusan)
        .then(res=>{
            history.push('/jurusan');
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err.response.data);
        });
};

export const getAllJurusan = () => disbatch =>{
    disbatch(loadingJurusan());
    axios.get('/api/konsultasi/jurusan')
        .then(res=>{
            disbatch({
                type:GET_ALL_JURUSAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        });
}


export const loadingJurusan = () => {
    return {
        type: LOADING_JURUSAN
    }
}


