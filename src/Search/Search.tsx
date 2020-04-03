import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import { searchUsers } from '../Api/api';
import SearchResults from './SearchResults/SearchResults';
import SearchResult from './SearchResult/SearchResult';
import './Search.css';

type SearchState = {
    searchResults: { nO: number; results: Array<{ login: string }> | null };
    userName: string;
    loading: boolean;
    searchResultOpen: boolean;
    searchResult: string | null;
};

export default class Search extends Component<{}, SearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchResults: { nO: 0, results: null },
            userName: '',
            loading: false,
            searchResultOpen: false,
            searchResult: null,
        };
        this.searchForUser = this.searchForUser.bind(this);
        this.openSearchResult = this.openSearchResult.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    searchForUser(): void {
        const { userName, loading } = this.state;
        if (loading || !userName) return;
        this.setState({ loading: true });
        searchUsers(userName)
            .then(result =>
                this.setState({ searchResults: { nO: result.response.total_count, results: result.response.items } }),
            )
            .catch()
            .finally(() => this.setState({ loading: false }));
    }

    openSearchResult(searchResult: string): void {
        const { searchResultOpen } = this.state;
        this.setState({ searchResultOpen: !searchResultOpen, searchResult });
    }

    onFormSubmit(e: { preventDefault: () => void }): void {
        e.preventDefault();
        this.searchForUser();
    }

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
