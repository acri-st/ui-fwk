
export type IRepository = {
    id: string
    url: string
}

export type IFile = {
    commitId: string;
    contentSha256: string;
    fileName: string;
    filePath: string;
    lastCommitId: string;
    size: string;
    commitMessage: string;
    commitDate: string;
    file_type: "tree"|"blob";
}
export type IRepositoryList = {
    files: IFile[]
    folders: IFile[]
}