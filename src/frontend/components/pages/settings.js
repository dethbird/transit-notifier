import React from 'react';
import { connect } from 'react-redux';

import ExternalLayout from 'components/layout/external-layout';
import { UI_STATE } from 'constants/ui-state';
import { settingsGet } from 'actions/settings';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }
    componentWillMount() {
        const { getSettings } = this.props;
        getSettings();
    }
    renderContent() {
        const { model, updateTripInfo } = this.props;
        if (!model)
            return null;
        return <div>{ model.route_id }</div>;
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
        getSettings: () => {
            dispatch(settingsGet());
        }
    }
  }

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.settingsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
