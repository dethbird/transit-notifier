import request from 'superagent';
import { TRIP_INFO } from 'constants/actions';

const tripInfoRequestInit = () => {
    return {
        type: TRIP_INFO.REQUEST
    }
}

const tripInfoRequestSuccess = (model) => {
    return {
        type: TRIP_INFO.SUCCESS,
        model
    }
}

const tripInfoRequestError = (errors) => {
    return {
        type: TRIP_INFO.ERROR,
        errors
    }
}

export const tripInfoGet = (id) =>
    dispatch => {
        dispatch(tripInfoRequestInit());
        request.get(`/api/trip-info`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(tripInfoRequestSuccess(res.body));
                } else {
                    dispatch(tripInfoRequestError(res.body));
                }
        });
    };

