export interface IDefaultState {
    searchResults: { nO: number; results: Array<{ login: string }> | null };
    userName: string;
    loading: boolean;
    searchResultOpen: boolean;
    searchResult: string | undefined;
}


export interface IState extends Partial<IDefaultState> {
}
