import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

@inject('user')
@observer
export default class UserList extends Component {

    componentWillMount(){
        this.props.user.getData();
    }

    _changeUserStatus = (e) =>{
        let userStatus = this.props.user.data[e.target.id];
        this.props.user.data[e.target.id].status = !userStatus;
    };

    render() {
        const data = this.props.user.data;

        return (
            <div>
                <h1>{data.length}</h1>
                <Table fixedHeader={true}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={{textAlign: 'center'}} colSpan="3">
                            <TableHeaderColumn>Number</TableHeaderColumn>
                            <TableHeaderColumn>Tenant</TableHeaderColumn>
                            <TableHeaderColumn>Firstname</TableHeaderColumn>
                            <TableHeaderColumn>Lastname</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {data.map((user, index)=>(
                            <TableRow key={index}>
                                <TableRowColumn>{user.ewd_number}</TableRowColumn>
                                <TableRowColumn>{user.ewd_tenant}</TableRowColumn>
                                <TableRowColumn>{user.ewd_firstname}</TableRowColumn>
                                <TableRowColumn>{user.ewd_lastname}</TableRowColumn>
                                <TableRowColumn>
                                    <Toggle
                                        id={index}
                                        onToggle={this._changeUserStatus}
                                        defaultToggled={user.status}
                                    />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <IconButton iconClassName="material-icons" tooltip="View" tooltipPosition="top-right">pageview</IconButton>
                                    <IconButton iconClassName="material-icons" tooltip="Delete" tooltipPosition="top-right">delete</IconButton>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}