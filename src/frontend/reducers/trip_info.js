import { TRIP_INFO } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const tripInfoReducer = (state = {
        model: undefined
    },
    action) => {

    switch (action.type) {
        case TRIP_INFO.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case TRIP_INFO.ERROR:
            return {
                ...state,
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case TRIP_INFO.SUCCESS:
            return {
                ...state,
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        default:
            return state;
    }
}

export default tripInfoReducer;
