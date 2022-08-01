import {ACTIONS} from './Actions';
import {state,Action} from "../state"
const reducer = (state:state, action:Action) => {
    switch (action.type) {
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            };
        case ACTIONS.ADD_CART:
            return{
                ...state,
                cart:action.payload
            }
        default:
            return state;
    }
}
export default reducer