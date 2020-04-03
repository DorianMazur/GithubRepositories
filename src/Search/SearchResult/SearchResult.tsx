import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';
import { getUserInfo, getRepositories } from '../../Api/api';
import { orderBy } from 'lodash';
import './SearchResult.css';

type SearchResultProps = {
    open: boolean;
    onClose: () => void;
    searchResult: string | null;
};

type SearchResultStat = {
    data: null | { avatar: string; bio: string; repos: Array<{ name: string; stargazers_count: number; url: string }> };
    loading: boolean;
};

export default class SearchResult extends Component<SearchResultProps, SearchResultStat> {
    constructor(props: SearchResultProps) {
        super(props);
        this.state = { loading: true, data: null };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(): void {
        const { searchResult } = this.props;
        if (!searchResult) return;
        const calls = [getUserInfo(searchResult), getRepositories(searchResult)];
        Promise.all(calls).then(responses => {
            const mostPopularRepos = orderBy(responses[1].response, ['stargazers_count', 'watchers_count']);
            const data = {
                avatar: responses[0].response.avatar_url,
                bio: responses[0].response.bio,
                repos: mostPopularRepos.slice(0, 3),
            };
            this.setState({ loading: false, data });
        });
    }

    render(): JSX.Element | null {
        const { open, onClose, searchResult } = this.props;
        const { loading, data } = this.state;
        if (!searchResult) return null;
        return (
            <Dialog
                onClose={onClose}
                onEnter={this.fetchData}
                aria-labelledby="simple-dialog-title"
                open={open}
                className="searchResult"
            >
                <DialogTitle id="simple-dialog-title">Acount name: {searchResult}</DialogTitle>
                {!loading && data ? (
                    <div className="searchResult__container">
                        <Avatar alt={searchResult} src={data.avatar} className="searchResult__avatar" />
                        <Typography variant="subtitle1">{data.bio || 'No Bio at all'}</Typography>
                        {data.repos.length ? (
                            <div>
                                <Typography variant="h6">Most popular repositories:</Typography>
                                {data.repos.map(repo => (
                                    <Link href={repo.url} key={repo.name} className="searchResult__link">
                                        {repo.name} <StarIcon /> {repo.stargazers_count}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <LinearProgress />
                )}
            </Dialog>
        );
    }
}
