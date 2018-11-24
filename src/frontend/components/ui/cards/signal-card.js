import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

class SignalCard extends React.Component {
    render() {
        const { model, signalName } = this.props;
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header><Icon color={ model.value=='on' ? 'green' : 'red' } name='circle' /> { signalName }</Card.Header>
                    <Card.Meta>{model.value}</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {model.reason}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default SignalCard;
