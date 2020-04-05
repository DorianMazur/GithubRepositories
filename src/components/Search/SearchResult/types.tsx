export interface IDefaultProps {
    open: boolean | undefined;
}

export interface IDefaultState {
    data: null | { avatar: string; bio: string; repos: Array<{ name: string; stargazers_count: number; url: string }> };
    loading: boolean;
}

export interface IProps extends Partial<IDefaultProps> {
    onClose: () => void;
    searchResult: string | undefined;
}

export interface IState extends Partial<IDefaultState> {
}
