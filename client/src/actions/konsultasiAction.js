import axios from 'axios';
import {  GET_QUESTION_KONSULTASI, LOADING_NEXT_QUESTION_KONSULTASI} from './types';


export const getQuestionKonsultasi = (jawabanUser) =>disbatch=>{
    console.log(jawabanUser);
    disbatch(loadingKonsultasi());
    axios.post('/api/konsultasi/jawaban/konsul',jawabanUser) 
        .then(res=>{
            disbatch({
                type:GET_QUESTION_KONSULTASI,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        })
}


export const saveHasilKonsultasi = (hasilAkhir) => disbatch =>{
    axios.post('/api/konsultasi/hasil/submit', hasilAkhir)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}


export const loadingKonsultasi = () =>{
    return{
        type:LOADING_NEXT_QUESTION_KONSULTASI
    }
}