import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {GridList} from 'material-ui/GridList';
import DataTables from 'material-ui-datatables';
import UserDetail from './UserDetail';
import {sortBy} from 'lodash';
import {toJS} from 'mobx';

const styles = {
    div: {
        flexDirection: 'row wrap',
        padding: 20,
        width: '100%',
        marginBottom: 30
    },
    paperLeft: {
        flex: 1,
        height: '100%',
        margin: 10,
        textAlign: 'center',
        padding: 10
    },
    paperRight: {
        height: 600,
        flex: 4,
        margin: 10,
        textAlign: 'center',
    }
};

@inject('user')
@observer
export default class UserList extends Component {

    constructor(props) {
        super(props);

        this.user = this.props.user;
    }

    setupTableHeader() {
        return [
            {
                key: 'ewd_number',
                label: 'Number',
                sortable: true
            },
            {
                key: 'ewd_tenant',
                label: 'Tenant',
                sortable: true
            },
            {
                key: 'ewd_firstname',
                label: 'Firstname',
                sortable: true
            },
            {
                key: 'ewd_lastname',
                label: 'Lastname',
                sortable: true
            },
            {
                key: 'isActive',
                label: 'Is Active?'
            },
            {
                key: 'action',
                label: ''
            }
        ];
    }

    setupTableContent() {
        let table = [];
        let action = {
            view: (<IconButton iconClassName="material-icons" tooltip="View"
                               tooltipPosition="top-right"
                               onClick={() => this.user.viewUserData(index)}>pageview</IconButton>),
            delete: (<IconButton iconClassName="material-icons" tooltip="Delete"
                                 tooltipPosition="top-right"
                                 onClick={() => this.user.remove(index)}>delete</IconButton>)
        };

        this.user.userList.forEach((user, index) => {
            let conf = {};
            conf['ewd_number'] = user.ewd_number;
            conf['ewd_tenant'] = user.ewd_tenant;
            conf['ewd_firstname'] = user.ewd_firstname;
            conf['ewd_lastname'] = user.ewd_lastname;
            conf['isActive'] = (
                <Toggle
                    id={index}
                    onToggle={this._changeUserStatus}
                    defaultToggled={user.isActive === 'true'}
                />
            );
            conf['action'] = (
                <div>
                    <IconButton iconClassName="material-icons" tooltip="View"
                                tooltipPosition="top-right"
                                onClick={() => this.user.viewUserData(index)}>pageview</IconButton>
                    <IconButton iconClassName="material-icons" tooltip="Delete"
                                tooltipPosition="top-right"
                                onClick={() => this.user.remove(index)}>delete</IconButton>
                </div>
            );

            table.push(conf);
        });

        return table;
    }

    componentWillMount() {
        this.props.user.getData();
    }

    _changeUserStatus = (e) => {
        let id = e.target.id;
        let userStatus = this.user.userList[id];
        this.user.userList[id].isActive = (!(userStatus.isActive === 'true')).toString();
        this.user.selectedIndex = id;
        this.user.save();
    };

    handleFilterValueChange = (value) => {
        console.log(value);
    };

    handleSortOrderChange = (key, order) => {
        console.log(key + ' ' + order);
    };

    render() {
        return (

            <div>
                <GridList cols={2}>
                    <Paper zDepth={3} style={styles.div}>
                        <RaisedButton
                            label="Add New Data"
                            icon={<FontIcon className="material-icons">add</FontIcon>}
                            onClick={() => this.user.cleanUp()}
                        />
                        <DataTables
                            height={'auto'}
                            selectable={false}
                            showRowHover={true}
                            columns={this.setupTableHeader()}
                            data={this.setupTableContent()}
                            showCheckboxes={false}
                            showHeaderToolbar={true}
                            onCellClick={this.handleCellClick}
                            onCellDoubleClick={this.handleCellDoubleClick}
                            onFilterValueChange={this.handleFilterValueChange}
                            onSortOrderChange={this.handleSortOrderChange}
                            count={1}
                        />
                    </Paper>

                    <UserDetail/>
                </GridList>
            </div>
        )
    }
}