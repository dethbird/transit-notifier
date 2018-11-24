import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Input, Header } from 'semantic-ui-react';

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
        const { model, ui_state } = this.props;
        if (!model)
            return null;
        return (
            <Form
                loading={ ui_state == UI_STATE.REQUESTING ? true : undefined }
                error={ ui_state == UI_STATE.ERROR ? true : undefined }
                success={ ui_state == UI_STATE.SUCCESS ? true : undefined }
                onSubmit={ ()=>{ console.log('submit!') } }
            >
                <Header as='h1'>Inbound Bulb</Header>
                <Form.Group>
                    <Form.Input label="Bulb Id" width={ 2 } placeholder='1,2,3...' />
                    <Form.Field width={ 4 }>
                        <label>Color Transition Duration</label>
                        <Input 
                            placeholder='In miliseconds'
                            label={{ basic: true, content: 'miliseconds' }}
                            labelPosition='right'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Trigger Stop Seconds</label>
                        <Input 
                            placeholder='360'
                            label={{ basic: true, content: 's' }}
                            labelPosition='right'
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Active Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input placeholder='0 - 7866' />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Inactive Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input placeholder='0 - 7866' />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                </Form.Group>

                <Divider />

                <Header as='h1'>Outbound Bulb</Header>
                <Form.Group>
                    <Form.Input label="Bulb Id" width={ 2 } placeholder='1,2,3...' />
                    <Form.Field width={ 4 }>
                        <label>Color Transition Duration</label>
                        <Input 
                            placeholder='In miliseconds'
                            label={{ basic: true, content: 'miliseconds' }}
                            labelPosition='right'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Trigger Stop Seconds</label>
                        <Input 
                            placeholder='360'
                            label={{ basic: true, content: 's' }}
                            labelPosition='right'
                        />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Active Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input placeholder='0 - 7866' />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Inactive Bulb Colors</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Hue</label>
                        <Input placeholder='0 - 7866' />
                    </Form.Field>
                    <Form.Field>
                        <label>Saturation</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                    <Form.Field>
                        <label>Brightness</label>
                        <Input placeholder='0 - 254' />
                    </Form.Field>
                </Form.Group>

                <Divider />

                <Header as='h1'>Advanced</Header>
                <Header as='h3'>Networking</Header>
                <Form.Group>
                    <Form.Field>
                        <label>Hue Bridge IP</label>
                        <Input placeholder='127.0.1.1' />
                    </Form.Field>
                </Form.Group>
                <Header as='h3'>Transit Info</Header>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Route ID</label>
                        <Input placeholder='100' />
                    </Form.Field>
                    <Form.Field>
                        <label>Inbound Trigger Stop ID</label>
                        <Input placeholder='SC-13' />
                    </Form.Field>
                    <Form.Field>
                        <label>Inbound Target Stop ID</label>
                        <Input placeholder='SC-14' />
                    </Form.Field>
                    <Form.Field>
                        <label>Outbound Trigger Stop ID</label>
                        <Input placeholder='SC-06' />
                    </Form.Field>
                    <Form.Field>
                        <label>Outbound Target Stop ID</label>
                        <Input placeholder='SC-08' />
                    </Form.Field>
                </Form.Group>

                <Divider />

                <Container textAlign='center'>
                    <Button size='massive' primary>Save</Button>
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
