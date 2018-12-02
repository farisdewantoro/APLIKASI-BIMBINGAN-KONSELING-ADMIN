import axios from 'axios';
import {LOADING_JAWABAN,GET_ALL_JAWABAN} from './types';


export const getAllJawaban = () => disbatch=>{
    disbatch(loadingJawaban());
    axios.get('/api/jawabans/get/all')
        .then(res=>{
            disbatch({
                type:GET_ALL_JAWABAN,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}


export const loadingJawaban = () =>{
    return{
        type:LOADING_JAWABAN
    }
}