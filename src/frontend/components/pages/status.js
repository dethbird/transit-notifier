import React from 'react';
import { connect } from 'react-redux';
import { Card, Divider, Grid } from 'semantic-ui-react'

import ExternalLayout from 'components/layout/external-layout';
import DatabaseCard from 'components/ui/cards/database-card';
import HueBridgeCard from 'components/ui/cards/hue-bridge-card';
import SignalCard from 'components/ui/cards/signal-card';
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
        const { model } = this.props;
        if (!model)
            return null;
        return (
            <div>
                <Grid>
                    <Grid.Column width={8}>
                        <SignalCard model={ model.SIGNALS.INBOUND } signalName='Inbound Signal'/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <SignalCard model={ model.SIGNALS.OUTBOUND } signalName='Outbound Signal'/>
                    </Grid.Column>
                </Grid>
                <Divider />
                <Grid>
                    <Grid.Column width={8}>
                        <DatabaseCard model={ model.database } />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <HueBridgeCard model={ model.hue_bridge } />
                    </Grid.Column>
                </Grid>
            </div>
        );
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
