import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import { searchUsers } from '../../api/api';
import SearchResults from './SearchResults/SearchResults';
import SearchResult from './SearchResult/SearchResult';
import { IState, IDefaultState } from './types';
import './Search.css';

export default class Search extends React.Component<{}, IState> {
    readonly state: IDefaultState = {
        searchResults: { nO: 0, results: null },
        userName: '',
        loading: false,
        searchResultOpen: false,
        searchResult: undefined,
    };

    searchForUser = () => {
        const { userName, loading } = this.state;
        if (loading || !userName) return;
        this.setState({ loading: true });
        searchUsers(userName)
            .then(result =>
                this.setState({ searchResults: { nO: result.response.total_count, results: result.response.items } }),
            )
            .catch()
            .finally(() => this.setState({ loading: false }));
    };

    openSearchResult = (searchResult: string) => {
        const { searchResultOpen } = this.state;
        this.setState({ searchResultOpen: !searchResultOpen, searchResult });
    };

    onFormSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        this.searchForUser();
    };

    render(): JSX.Element {
        const { userName, searchResults, searchResultOpen, searchResult, loading } = this.state;
        return (
            <div>
                <SearchResult
                    open={searchResultOpen}
                    searchResult={searchResult}
                    onClose={(): void => this.setState({ searchResultOpen: !searchResultOpen })}
                />
                <Paper component="form" onSubmit={this.onFormSubmit} className="search">
                    <InputBase
                        className="search__input"
                        placeholder="Search for Github Repositories"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={userName}
                        onChange={(event: { target: { value: string } }): void =>
                            this.setState({ userName: event.target.value })
                        }
                    />
                    <IconButton aria-label="search" className="search__icon" onClick={this.searchForUser}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                {loading ? <LinearProgress /> : null}
                <SearchResults
                    searchResults={searchResults}
                    openSearchResult={(searchResult: string): void => this.openSearchResult(searchResult)}
                />
            </div>
        );
    }
}
