import axios from 'axios';
import {observable, action} from 'mobx';

class UserStore {
    @observable data = [];

    @action
    async getData() {
        try{
            let {data} = await axios.get('http://localhost:1234');
            this.data = data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default UserStore;