import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {GridList} from 'material-ui/GridList';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import UserDetail from './UserDetail';

const styles = {
    div:{
        flexDirection: 'row wrap',
        padding: 20,
        width: '100%',
        marginBottom: 30
    },
    paperLeft:{
        flex: 1,
        height: '100%',
        margin: 10,
        textAlign: 'center',
        padding: 10
    },
    paperRight:{
        height: 600,
        flex: 4,
        margin: 10,
        textAlign: 'center',
    }
};

@inject('user')
@observer
export default class UserList extends Component {

    constructor(props){
        super(props);

        this.user = this.props.user;
    }

    componentWillMount(){
        this.props.user.getData();
    }

    _changeUserStatus = (e) =>{
        let userStatus = this.user.userList[e.target.id];
        this.user.userList[e.target.id].status = (!(userStatus.status === 'true')).toString();
        this.user.save();
    };

    render() {
        return (
            <div>
                <GridList cols={2}>
                    <Paper zDepth={3} style={styles.div}>
                        <RaisedButton
                            label="Add New Data"
                            icon={<FontIcon className="material-icons">add</FontIcon>}
                            onClick={()=>this.user.cleanUp()}
                        />

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
                                {this.user.userList.map((user, index)=>(
                                    <TableRow key={index}>
                                        <TableRowColumn>{user.ewd_number}</TableRowColumn>
                                        <TableRowColumn>{user.ewd_tenant}</TableRowColumn>
                                        <TableRowColumn>{user.ewd_firstname}</TableRowColumn>
                                        <TableRowColumn>{user.ewd_lastname}</TableRowColumn>
                                        <TableRowColumn>
                                            <Toggle
                                                id={index}
                                                onToggle={this._changeUserStatus}
                                                defaultToggled={user.status === 'true'}
                                            />
                                        </TableRowColumn>
                                        <TableRowColumn style={{overflow: 'visible'}}>
                                            <IconButton iconClassName="material-icons" tooltip="View" tooltipPosition="top-right" onClick={()=>this.user.viewUserData(index)}>pageview</IconButton>
                                            <IconButton iconClassName="material-icons" tooltip="Delete" tooltipPosition="top-right" onClick={()=>this.user.remove(index)}>delete</IconButton>
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    <UserDetail />
                </GridList>
            </div>
        )
    }
}