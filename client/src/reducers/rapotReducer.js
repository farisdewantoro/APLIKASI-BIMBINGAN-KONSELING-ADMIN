import { GET_RAPOT_MURID } from '../actions/types';

const initialState = {
    murid: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RAPOT_MURID:
            return {
                ...state,
                murid:action.payload,
                loading: false
            }
    
        default:
            return state;
    }
}