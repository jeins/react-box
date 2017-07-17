import axios from 'axios';
import {observable, action} from 'mobx';

class User {
    @observable data = [];

    @action
    // async getData() {
    //     let {data} = await axios.get('http://localhost:1234');
    //     this.data = data;
    // }
    getData(){
        axios.get('http://localhost:1234')
            .then(response => {
                console.log(response);
                this.data = response;
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default User;