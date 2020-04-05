import React from 'react';
import Paper from '@material-ui/core/Paper';
import { IProps } from './types';
import './SearchResults.css';

const SearchResults = (props: IProps): JSX.Element | null => {
    const { searchResults, openSearchResult } = props;
    if (!searchResults.results) return null;
    const bestMatches = searchResults.results.slice(0, 5);
    return (
        <div className="searchResults">
            <div></div>Number of all results: {searchResults.nO}
            {searchResults.results.length ? (
                <div>
                    <div className="searchResults__bestMatchesTitle">(showing {bestMatches.length} best matches)</div>
                    <div>
                        {bestMatches.map((user: { login: string }) => (
                            <Paper
                                key={user.login}
                                className="searchResults__bestMatch"
                                onClick={(): void => openSearchResult(user.login)}
                            >
                                {user.login}
                            </Paper>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SearchResults;
