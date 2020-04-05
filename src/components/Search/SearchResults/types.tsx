export interface IDefaultProps {
}


export interface IProps extends Partial<IDefaultProps> {
    searchResults: { nO: number; results: Array<{ login: string }> | null };
    openSearchResult: (searchResult: string) => void;
}

