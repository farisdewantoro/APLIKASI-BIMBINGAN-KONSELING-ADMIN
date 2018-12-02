import { LOADING_JAWABAN, GET_ALL_JAWABAN } from '../actions/types';

const initialState={
    loading:false,
    jawaban:null
}

export default function(state = initialState,action){
    switch (action.type) {
        case LOADING_JAWABAN:
            return{
                ...state,
                loading:true
            }
        case GET_ALL_JAWABAN:
            return{
                ...state,
                loading:false,
                jawaban:action.payload
            }
    
        default:
            return state;
    }
}