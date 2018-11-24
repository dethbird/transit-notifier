import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

class HueBridgeCard extends React.Component {
    renderDetails() {
        const { model } = this.props;
        if (model.status !== 'ok')
            return null;
        if (!model.details.config)
            return (
                <Card.Content>
                    ERROR: { model.details[0].error.description }
                </Card.Content>
            );
        return (
            <Card.Content extra>
                IP: { model.details.config.ipaddress }<br />
                { Object.keys(model.details.lights).length } lights
            </Card.Content>
        )

    }

    render() {
        const { model } = this.props;
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header><Icon color={ model.status=='ok' ? 'green' : 'red' } name='hdd' /> Hue Bridge</Card.Header>
                    <Card.Meta>{model.status}</Card.Meta>
                    <Card.Description>
                        {model.message}
                    </Card.Description>
                </Card.Content>
                { this.renderDetails() }
            </Card>
        );
    }
}

export default HueBridgeCard;
