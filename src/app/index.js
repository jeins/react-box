import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lightGreen600} from 'material-ui/styles/colors';

import UserList from './components/UserList';

const customTheme = getMuiTheme({
    palette: {
        accent1Color: lightGreen600,
    },
});

const App = () => {
    return (
        <MuiThemeProvider muiTheme={customTheme}>
            <UserList/>
        </MuiThemeProvider>
    );
};

render(<App />, document.getElementById('app'));