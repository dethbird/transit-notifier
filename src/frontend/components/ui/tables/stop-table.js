import React from 'react';
import { Table } from 'semantic-ui-react'

class StopTable extends React.Component {
    renderRowData(rowName, rowData) {
        return (
            <Table.Row>
                <Table.Cell>{ rowName }</Table.Cell>
                <Table.Cell>{ rowData ? rowData.STOP.stop_id : null }</Table.Cell>
                <Table.Cell>{ rowData ? rowData.STOP.stop_name: null }</Table.Cell>
                <Table.Cell>{ rowData ? `${rowData.TOTAL_SECONDS.toFixed(1)} s` : null }</Table.Cell>
            </Table.Row>
        );
    }

    render() {
        const { model } = this.props;
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
                    <Table.Row>
                        <Table.Cell colSpan={ 4 } style={{backgroundColor: '#f9fafb'}}><h5>Inbound</h5></Table.Cell>
                    </Table.Row>
                    { this.renderRowData('Trigger', model.INBOUND_TRIGGER) }
                    { this.renderRowData('Target', model.INBOUND_TARGET) }
                    <Table.Row>
                        <Table.Cell colSpan={ 4 } style={{backgroundColor: '#f9fafb'}}><h5>Outbound</h5></Table.Cell>
                    </Table.Row>
                    { this.renderRowData('Trigger', model.OUTBOUND_TRIGGER) }
                    { this.renderRowData('Target', model.OUTBOUND_TARGET) }
                </Table.Body>
            </Table>
        );
    }
}

export default StopTable;
