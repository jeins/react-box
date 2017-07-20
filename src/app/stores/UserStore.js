import axios from 'axios';
import {observable, action, computed, toJS} from 'mobx';

class UserStore {
    @observable userList = [];
    @observable selectedIndex = null;
    @observable user = {
        ewd_tenant: '',
        REMOTE_USER: '',
        USERDOMAIN: '',
        Shib_Identity_Provider: '',
        ewd_firstname: '',
        ewd_lastname: '',
        ewd_email: '',
        ewd_phone: '',
        ewd_mobile: '',
        ewd_number: ''
    };
    @observable apiUrl = 'http://localhost:1234';

    @action
    async getData() {
        try {
            let {data} = await axios.get(this.apiUrl);
            this.userList = data;
        } catch (err) {
            console.log(err);
        }
    }

    @action
    viewUserData(index) {
        this.selectedIndex = index;
        this.user = this.userList[index];
    }

    @action
    cleanUp() {
        this.user = {
            ewd_tenant: '',
            REMOTE_USER: '',
            USERDOMAIN: '',
            Shib_Identity_Provider: '',
            ewd_firstname: '',
            ewd_lastname: '',
            ewd_email: '',
            ewd_phone: '',
            ewd_mobile: '',
            ewd_number: ''
        };
        this.selectedIndex = null;
    }

    @action
    async save() {
        try {
            let component = '?mode=';
            let userData = this.user;

            if (!this.isUserSelected) {
                this.userList.push(this.user);
            }

            if (this.isUserSelected) {
                component += "update&id=" + this.selectedIndex;
                userData = this.userList[this.selectedIndex];
            } else {
                component += "add";
            }

            Object.keys(userData).forEach(key => {
                component += '&' + key + '=' + userData[key];
            });

            await axios.get(this.apiUrl + component);

            this.cleanUp();
        } catch (err) {
            console.error(err);
        }
    }

    @action
    async remove(id) {
        try {
            this.userList.splice(id, 1);
            let component = '?mode=remove&id=' + id;
            let {success} = await axios.get(this.apiUrl + component);
            this.cleanUp();
        } catch (err) {
            console.error(err);
        }
    }

    @computed
    get isUserSelected() {
        return this.selectedIndex !== null;
    }
}

export default UserStore;