import request from 'superagent';
import { SETTINGS } from 'constants/actions';

const settingsRequestInit = () => {
    return {
        type: SETTINGS.REQUEST
    }
}

const settingsRequestSuccess = (model) => {
    return {
        type: SETTINGS.SUCCESS,
        model
    }
}

const settingsRequestError = (errors) => {
    return {
        type: SETTINGS.ERROR,
        errors
    }
}

export const settingsGet = (id) =>
    dispatch => {
        dispatch(settingsRequestInit());
        request.get(`/api/settings`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(settingsRequestSuccess(res.body));
                } else {
                    dispatch(settingsRequestError(res.body));
                }
        });
    };

export const settingsUpdate = (changedFields) => {
    return {
        type: SETTINGS.UPDATE,
        changedFields
    };
}
