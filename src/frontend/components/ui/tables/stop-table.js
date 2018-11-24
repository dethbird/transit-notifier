import React from 'react';
import { Table } from 'semantic-ui-react'

class StopTable extends React.Component {
    renderRowData(rowName, rowData) {
        if (!rowData)
            return null
        return (
            <Table.Row>
                <Table.Cell>{ rowName }</Table.Cell>
                <Table.Cell>{ rowData.STOP.stop_id }</Table.Cell>
                <Table.Cell>{ rowData.STOP.stop_name }</Table.Cell>
                <Table.Cell>{ rowData.TOTAL_SECONDS }</Table.Cell>
            </Table.Row>
        );
    }

    render() {
        const { model } = this.props;
        console.log(model);
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Stop ID</Table.HeaderCell>
                        <Table.HeaderCell>Stop Name</Table.HeaderCell>
                        <Table.HeaderCell>Departure</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.renderRowData('Inbound Trigger', model.INBOUND_TRIGGER) }
                    { this.renderRowData('Inbound Target', model.INBOUND_TARGET) }
                    { this.renderRowData('Outbound Trigger', model.OUTBOUND_TRIGGER) }
                    { this.renderRowData('Outbound Target', model.OUTBOUND_TARGET) }
                </Table.Body>
            </Table>
        );
    }
}

export default StopTable;
