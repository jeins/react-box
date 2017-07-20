import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lightGreen600} from 'material-ui/styles/colors';
import {Provider} from "mobx-react";
import injectTapEventPlugin from 'react-tap-event-plugin';

import UserStore from './stores/UserStore';
import UserList from './components/UserList';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const customTheme = getMuiTheme({
    palette: {
        primary1Color: lightGreen600,
    },
});

const App = () => {
    const user = new UserStore();

    return (
        <MuiThemeProvider muiTheme={customTheme}>
            <Provider user={user}>
                <UserList/>
            </Provider>
        </MuiThemeProvider>
    );
};

render(<App />, document.getElementById('app'));