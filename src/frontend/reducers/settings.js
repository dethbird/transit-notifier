import { SETTINGS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const settingsReducer = (state = {
        model: undefined,
        ui_state: UI_STATE.SUCCESS,
        errors: null,
        changedFields: {}
    },
    action) => {
    switch (action.type) {
        case SETTINGS.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case SETTINGS.ERROR:
            return {
                ...state,
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case SETTINGS.SUCCESS:
            return {
                ...state,
                ui_state: UI_STATE.SUCCESS,
                model: action.model,
                changedFields: {}
            }
        case SETTINGS.UPDATE:
            return {
                ...state,
                changedFields: action.changedFields
            }
        default:
            return state;
    }
}

export default settingsReducer;
