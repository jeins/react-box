import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class UserList extends Component{
    render(){
        return (
            <p> hello world </p>
        )
    }
}