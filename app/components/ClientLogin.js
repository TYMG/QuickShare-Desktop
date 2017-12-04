import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as WebsocketActions from './../actions/websocket';
import styles from './Client.css';

function mapStateToProps(state) {
    return {isConnected: state.messages.status};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(WebsocketActions, dispatch)
    };
}

class ClientLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleLoginClick = _ => {
        console.log('TEST')
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
            return <button type="button" onClick={this.handleLoginClick}>Disconnect</button>;
        } else {
            return <button type="button" onClick={this.handleLoginClick}>Connect</button>;
        }
    }

    render() {
        let btn = this.renderLoginBtn();

        let testFunc = _ => (console.log("TEST"))
        return (
            <div>
                <button
                    className={styles.btn}
                    onClick={this
                    .handleLoginClick
                    .bind(this)}
                    data-tclass="btn">Login</button>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);
