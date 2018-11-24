import React from 'react';
import { Message } from 'semantic-ui-react';

class ErrorMessage extends React.Component {
    render() {
        const { message } = this.props;
        if(message)
            return (
                <Message
                    error
                    content={ message }
                />
            );
        return null;
    }
}

export default ErrorMessage;
