import React from 'react';
import { connect } from 'react-redux';

import ExternalLayout from 'components/layout/external-layout';
import { UI_STATE } from 'constants/ui-state';
import { tripInfoGet } from 'actions/trip-info';

class Status extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(tripInfoGet());
    }
    render() {
        return (
            <ExternalLayout>
                <h1>Status</h1>
            </ExternalLayout>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const { ui_state, errors, model } = state.tripInfoReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(Status);
