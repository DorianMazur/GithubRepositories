import React from 'react';
import Paper from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import Search from '../Search/Search';
import './App.css';

function App(): JSX.Element {
    return (
        <div className="app">
            <Paper className="appTitle">
                <GitHubIcon /> Maybe The Best Github Search
            </Paper>
            <Search />
        </div>
    );
}

export default App;
