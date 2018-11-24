import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

class DatabaseCard extends React.Component {
    render() {
        const { model } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header><Icon color={ model.status=='ok' ? 'green' : 'red' } name='database' /> Database</Card.Header>
                    <Card.Meta>{model.status}</Card.Meta>
                    <Card.Description>
                        {model.message}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default DatabaseCard;
