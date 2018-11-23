import React from 'react';
import { connect } from 'react-redux';

import ExternalLayout from 'components/layout/external-layout';
import { UI_STATE } from 'constants/ui-state';
import { tripInfoGet } from 'actions/trip-info';

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }
    componentWillMount() {
        const { updateTripInfo } = this.props;
        updateTripInfo();
        setInterval(() => { updateTripInfo() }, 10000);
    }
    renderContent() {
        const { model, updateTripInfo } = this.props;
        if (!model)
            return null;
        return <div>{ model.database.status }</div>;
    }
    render() {
        return (
            <ExternalLayout>
                { this.renderContent() }
            </ExternalLayout>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTripInfo: () => {
            dispatch(tripInfoGet());
        }
    }
  }

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.tripInfoReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
