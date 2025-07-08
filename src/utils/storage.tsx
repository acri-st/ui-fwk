import { IFile } from "./types"

export const formatFileResponse = (files: IFile[], folders?: IFile[]) => {
    let _files = [];
    for(let f of folders || []){
        f.file_type = 'tree'
        _files.push(f);
    }
    for(let f of files){
        f.file_type = 'blob'
        _files.push(f);
    }
    return _files.filter((f)=>!['.gitlab-ci.yml', '.gitlab-ci.yaml'].includes(f.fileName))
}