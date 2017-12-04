import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Client from '../components/ClientLogin';

import * as WebsocketActions from './../actions/websocket';

function mapStateToProps(state) {
    return {messages: state.messages, isConnected: state.messages.status};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(WebsocketActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);
