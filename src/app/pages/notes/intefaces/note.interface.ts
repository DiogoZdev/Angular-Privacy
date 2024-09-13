export interface INewNote {
    title: string;
    content: string;
}

export interface INote extends INewNote {
    id: string;
    resolved: string;
}
