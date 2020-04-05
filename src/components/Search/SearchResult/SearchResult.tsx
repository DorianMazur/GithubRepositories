import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';
import { getUserInfo, getRepositories } from '../../../api/api';
import { orderBy } from 'lodash';
import { IState, IProps, IDefaultProps, IDefaultState } from './types';
import './SearchResult.css';

export default class SearchResult extends React.Component<IProps, IState> {
    static defaultProps: IDefaultProps = {
        open: false,
    };

    readonly state: IDefaultState = {
        loading: true,
        data: null,
    };

    fetchData = () => {
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
    };

    onClose = () => {
        this.setState({ loading: true, data: null }, () => this.props.onClose());
    };

    render(): JSX.Element | null {
        const { open, searchResult } = this.props;
        const { loading, data } = this.state;
        if (!searchResult) return null;
        return (
            <Dialog
                onClose={this.onClose}
                onEnter={this.fetchData}
                aria-labelledby="simple-dialog-title"
                open={open || false}
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
