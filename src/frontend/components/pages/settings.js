import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Input, Header } from 'semantic-ui-react';

import ExternalLayout from 'components/layout/external-layout';
import { UI_STATE } from 'constants/ui-state';
import { settingsGet, settingsPut, settingsUpdate } from 'actions/settings';
import settingsPutSchema from 'validation/settings-put.json';
import * as jsonSchema from 'utility/json-schema';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }
    componentWillMount() {
        const { getSettings } = this.props;
        getSettings();
    }
    handleFieldChange(e,el) {
        const { changedFields, updateSettings } = this.props;
        changedFields[el.id] = el.value;
        updateSettings(changedFields);
        this.forceUpdate();
    }
    handleClickSubmit() {
        const { changedFields, putSettings } = this.props;
        putSettings(changedFields);
    }
    renderContent() {
        const { model, ui_state, changedFields } = this.props;
        if (!model)
            return null;
        const inputFields = jsonSchema.buildInputFields(model, changedFields, settingsPutSchema);
        
        return (
            <Form
                loading={ ui_state == UI_STATE.REQUESTING ? true : undefined }
                error={ ui_state == UI_STATE.ERROR ? true : undefined }
                success={ ui_state == UI_STATE.SUCCESS ? true : undefined }
                onSubmit={ this.handleClickSubmit.bind(this) }
            >
                <Header as='h1'>Inbound Bulb</Header>
                <Form.Group>
                    <Form.Input 
                        label="Bulb Id"
                        width={ 2 }
                        placeholder='1,2,3...' 
                        onChange={ this.handleFieldChange.bind(this) }
                        id='inbound_bulb_id'
                        value={ inputFields.inbound_bulb_id || '' }
                    />
                    <Form.Field width={ 4 }>
                        <label>Color Transition Duration</label>
                        <Input 
                            placeholder='In miliseconds'
                            label={{ basic: true, content: 'miliseconds' }}
                            labelPosition='right'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_transition_time'
                            value={ inputFields.inbound_bulb_transition_time || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Trigger Stop Seconds</label>
                        <Input 
                            placeholder='360'
                            label={{ basic: true, content: 's' }}
                            labelPosition='right'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_trigger_seconds'
                            value={ inputFields.inbound_trigger_seconds || '' }
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Active Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input 
                            placeholder='0 - 7866'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_hue_active'
                            value={ inputFields.inbound_bulb_hue_active || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_sat_active'
                            value={ inputFields.inbound_bulb_sat_active || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_bri_active'
                            value={ inputFields.inbound_bulb_bri_active || '' }
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Inactive Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input 
                            placeholder='0 - 7866'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_hue_inactive'
                            value={ inputFields.inbound_bulb_hue_inactive || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_sat_inactive'
                            value={ inputFields.inbound_bulb_sat_inactive || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_bulb_bri_inactive'
                            value={ inputFields.inbound_bulb_bri_inactive || '' }
                        />
                    </Form.Field>
                </Form.Group>

                <Divider />

                <Header as='h1'>Outbound Bulb</Header>
                <Form.Group>
                    <Form.Input 
                        label="Bulb Id"
                        width={ 2 }
                        placeholder='1,2,3...' 
                        onChange={ this.handleFieldChange.bind(this) }
                        id='bound_bulb_id'
                        value={ inputFields.outbound_bulb_id || '' }
                    />
                    <Form.Field width={ 4 }>
                        <label>Color Transition Duration</label>
                        <Input 
                            placeholder='In miliseconds'
                            label={{ basic: true, content: 'miliseconds' }}
                            labelPosition='right'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_transition_time'
                            value={ inputFields.outbound_bulb_transition_time || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Trigger Stop Seconds</label>
                        <Input 
                            placeholder='360'
                            label={{ basic: true, content: 's' }}
                            labelPosition='right'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_trigger_seconds'
                            value={ inputFields.outbound_trigger_seconds || '' }
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Active Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input 
                            placeholder='0 - 7866'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_hue_active'
                            value={ inputFields.outbound_bulb_hue_active || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_sat_active'
                            value={ inputFields.outbound_bulb_sat_active || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_bri_active'
                            value={ inputFields.outbound_bulb_bri_active || '' }
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Inactive Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input 
                            placeholder='0 - 7866'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_hue_inactive'
                            value={ inputFields.outbound_bulb_hue_inactive || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_sat_inactive'
                            value={ inputFields.outbound_bulb_sat_inactive || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input
                            placeholder='0 - 254'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_bulb_bri_inactive'
                            value={ inputFields.outbound_bulb_bri_inactive || '' }
                        />
                    </Form.Field>
                </Form.Group>

                <Divider />

                <Header as='h1'>Advanced</Header>
                <Header as='h3'>Networking</Header>
                <Form.Group>
                    <Form.Field>
                        <label>Hue Bridge IP</label>
                        <Input
                            placeholder='127.0.1.1'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='hue_bridge_ip'
                            value={ inputFields.hue_bridge_ip || '' }
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Transit Info</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Route ID</label>
                        <Input
                            placeholder='100'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='route_id'
                            value={ inputFields.route_id || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Inbound Trigger Stop ID</label>
                        <Input
                            placeholder='SC-13'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_trigger_stop_id'
                            value={ inputFields.inbound_trigger_stop_id || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Inbound Target Stop ID</label>
                        <Input
                            placeholder='SC-14'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='inbound_target_stop_id'
                            value={ inputFields.inbound_target_stop_id || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Outbound Trigger Stop ID</label>
                        <Input
                            placeholder='SC-06'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_trigger_stop_id'
                            value={ inputFields.outbound_trigger_stop_id || '' }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Outbound Target Stop ID</label>
                        <Input
                            placeholder='SC-08'
                            onChange={ this.handleFieldChange.bind(this) }
                            id='outbound_target_stop_id'
                            value={ inputFields.outbound_target_stop_id || '' }
                        />
                    </Form.Field>
                </Form.Group>

                <Divider />

                <Container textAlign='center'>
                    <Button 
                        size='massive'
                        primary
                        type='submit'
                        disabled={ Object.keys(changedFields).length==0 }
                        loading={ ui_state == UI_STATE.REQUESTING }
                    >Save</Button>
                </Container>
                <br />
                <br />
            </Form>
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
        getSettings: () => {
            dispatch(settingsGet());
        },
        putSettings: (changedFields) => {
            dispatch(settingsPut(changedFields));
        },
        updateSettings: (changedFields) => {
            dispatch(settingsUpdate(changedFields));
        }
    }
  }

const mapStateToProps = (state) => {
    const { ui_state, errors, model, changedFields } = state.settingsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model,
        changedFields
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
