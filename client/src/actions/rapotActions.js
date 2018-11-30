import axios from 'axios';
import { GET_DATA_RAPOT_MURID, IMPORT_RAPOT_MURID, IMPORT_LOADING} from './types';
import { setGetRapotLoading} from './muridActions';
export const createRapotMurid = (nis,dataRapot, history) => disbatch => {
    axios.post('/api/rapots/create',dataRapot)
        .then(res=>{
            history.push('/rapotsiswa/'+nis);
        });
}

export const getDataRapotMurid = (nis,kelas,semester) => disbatch =>{
    disbatch(setGetRapotLoading());
    axios.get(`/api/rapots/show/${nis}/${kelas}/${semester}`)
        .then(res =>{
            disbatch({
                type:GET_DATA_RAPOT_MURID,
                payload:res.data
            })
        })
}

export const importRapotMurid = (dataRapot)=>disbatch=>{
    disbatch(importLoading());
    axios.post('/api/rapots/import',dataRapot)
        .then(res=>{
            disbatch({
                type:IMPORT_RAPOT_MURID,
                payload:res.data
            });
        });
}

export const importLoading=()=>{
    return{
        type: IMPORT_LOADING
    }
}