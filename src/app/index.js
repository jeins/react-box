import React from 'react';
import ReactDom from 'react-dom';

import UserList from './components/UserList';

const app = document.getElementById('app');

ReactDom.render(<UserList />, app);