import axios from 'axios';
import { GET_DATA_RAPOT_MURID} from './types';

export const createRapotMurid = (nis,dataRapot, history) => disbatch => {
    axios.post('/api/rapots/create',dataRapot)
        .then(res=>{
            history.push('/rapotsiswa/'+nis);
        });
}

export const getDataRapotMurid = (nis,kelas,semester) => disbatch =>{
    axios.get(`/api/rapots/show/${nis}/${kelas}/${semester}`)
        .then(res =>{
            disbatch({
                type:GET_DATA_RAPOT_MURID,
                payload:res.data
            })
        })
}