import React from 'react';
import { withRouter  } from "react-router-dom";
import { Container, Menu } from 'semantic-ui-react'

class ExternalLayout extends React.Component {
    render() {
        const { history, match } = this.props;
        return (
            <div>
                <br />
                <Container>
                    <Menu tabular>
                        <Menu.Item name='Status' active={ ['/', 'status'].indexOf(match.path) >= 0 } onClick={()=>{ history.push('/') }} />
                        <Menu.Item name='Settings' active={ match.path=='/settings' } onClick={()=>{ history.push('/settings') }} />
                    </Menu>
                </Container>
                <br />
                <Container>
                    {this.props.children}
                </Container>
            </div>);
    }
}

export default withRouter(ExternalLayout);
