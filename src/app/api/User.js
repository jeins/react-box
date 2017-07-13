import axios from 'axios';
import {observer} from 'mobx-react';

export default class User {
    @observer data;

    constructor() {
        this.data = [];
    }

    async getData() {
        let {data} = await axios.get('http://localhost:1234');
        this.data = data;
    }
}