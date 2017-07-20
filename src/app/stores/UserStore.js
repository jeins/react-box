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

    @action
    async getData() {
        try{
            let {data} = await axios.get('http://localhost:1234');
            this.userList = data;
        } catch (err) {
            console.log(err);
        }
    }

    @action
    viewUserData(index){
        this.selectedIndex = index;
        this.user = this.userList[index];
    }

    @action
    cleanUp(){
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
    }

    @action
    async save(){
        try{
            let isUserEmpty = Object.keys(toJS(this.user)).length === 0;
            if(!this.isUserSelected && this.isUserExist && !isUserEmpty){
                this.userList.push(this.user);
            }
            
            await axios.post('http://localhost:1234', this.userList);

            this.cleanUp();
        } catch (err){
            console.log(err);
        }
    }

    @action
    remove(id){
        this.user = {};
        this.userList.splice(id, 1);
        this.save();
    }

    @computed
    get isUserSelected(){
        return this.selectedIndex !== null;
    }

    @computed
    get isUserExist(){
        let isValid = true;
        Object.keys(this.user).forEach(key =>{
            if(!this.user[key]){
                isValid = false;
                return false;
            }
        });

        return isValid;
    }
}

export default UserStore;