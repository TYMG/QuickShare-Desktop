import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as WebsocketActions from './../actions/websocket';

function mapStateToProps(state) {
    return {isConnected: state.messages.status};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(WebsocketActions, dispatch)
    };
}

class ClientLogin extends Component {

    handleLoginClick() {
        this.props.isConnected
            ? this
                .props
                .actions
                .disconnect()
            : this
                .props
                .actions
                .connect();
    }

    renderLoginBtn() {
        if (this.props.isConnected) {
            return <button type="button" onClick={() => this.handleLoginClick}>Disconnect</button>;
        } else {
            return <button type="button" onClick={() => this.handleLoginClick}>Connect</button>;
        }
    }

    render() {
        return (
            <div>
                {this.renderLoginBtn()
}
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);
