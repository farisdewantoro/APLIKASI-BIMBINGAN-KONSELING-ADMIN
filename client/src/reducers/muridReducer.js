import { GET_ALL_MURID} from '../actions/types';

const initialState ={
    murids:null,
    loading:false
}

export default function(state = initialState,action ){
    switch(action.type){
        case GET_ALL_MURID:
            return{
                ...state,
                murids:action.payload,
                loading:false
            }
        default:
            return state;
    }
}