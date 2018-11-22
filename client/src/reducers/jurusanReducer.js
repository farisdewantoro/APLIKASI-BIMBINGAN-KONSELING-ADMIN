import { LOADING_JURUSAN, GET_ALL_JURUSAN} from '../actions/types';

const initialState ={
    jurusans:null,
    loading:null
}


export default function (state = initialState,action){
    switch(action.type){
        case LOADING_JURUSAN:
            return{
                ...state,
                loading:true
            }
        case GET_ALL_JURUSAN:
            return{
                ...state,
                loading:false,
                jurusans:action.payload
            }
        default:
            return state;
    }
} 