import { GET_RAPOT_MURID, GET_RAPOT_MURID_LOADING, GET_DATA_RAPOT_MURID, IMPORT_RAPOT_MURID, IMPORT_LOADING } from '../actions/types';

const initialState = {
    murid: null,
    loading: false,
    rapot: null,
    loadingImport:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RAPOT_MURID_LOADING:
            return{
                ...state,
                murid:null,
                rapot:null,
                loading:true
            }
        case GET_RAPOT_MURID:
            return {
                ...state,
                murid:action.payload,
                rapot:null,
                loading: false
            }
        case GET_DATA_RAPOT_MURID:
            return {
                ...state,
                rapot:action.payload,
                loading:false
            }
        case IMPORT_LOADING:
            return{
                ...state,
                loadingImport:true
            }
        case IMPORT_RAPOT_MURID:
            return {
                ...state,
                rapot:action.payload,
                loadingImport:false
            }
    
        default:
            return state;
    }
}