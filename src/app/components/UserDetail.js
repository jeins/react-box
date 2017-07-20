import React, {Component} from "react";
import {observer, inject} from 'mobx-react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    div: {
        flexDirection: 'row wrap',
        padding: 20,
        width: '100%',
        height: '500px',
        marginBottom: 30
    },
    inputFirst: {
        width: '30%',
        marginRight: 30
    }
};

@inject('user')
@observer
class UserDetail extends Component {

    constructor(props) {
        super(props);

        this.user = this.props.user.user;
        this.disabledButton = true;
    }

    handleChange = (e) => {
        this.user[e.target.name] = e.target.value;
    };

    validateForm() {
        let isValid = true;

        Object.keys(this.user).forEach(key => {
            if (key !== 'isActive' && !this.user[key]) {
                isValid = false;
                return false;
            }
        });

        return isValid;
    };

    render() {
        this.user = this.props.user.user;
        this.disabledButton = !this.validateForm();

        return (
            <Paper style={styles.div} zDepth={3}>
                {
                    Object.keys(this.user).map((key, index) => {
                        return (
                            <TextField
                                key={index}
                                style={styles.inputFirst}
                                floatingLabelText={key}
                                name={key} value={this.user[key]}
                                disabled={key === 'isActive'}
                                onChange={this.handleChange}/>
                        )
                    })
                }
                <div>
                    <RaisedButton label="Save"
                                  style={{marginRight: 20, marginTop: 30}} fullWidth={true} primary={true}
                                  disabled={this.disabledButton} onClick={() => this.props.user.save()}/>
                </div>
            </Paper>
        )
    }
}

export default UserDetail;