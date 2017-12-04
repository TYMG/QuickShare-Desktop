import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './Client.css';
import ClientLogin from './ClientLogin';

class Client extends Component {
    props : {};

    render() {
        return (
            <div>
                <div className={styles.backButton} data-tid="backButton">
                    <Link to="/">
                        <i className="fa fa-arrow-left fa-3x"/>
                    </Link>
                </div>
                <div>
                    <ClientLogin/>
                    <div>
                        {this.props.isConnected
                            ? 'Status : connected'
                            : 'Status : disconnected'}
                    </div>
                </div>
                <div>
                    <h1>THE TEST</h1>
                </div>
            </div>
        );
    }
}

export default Client;
