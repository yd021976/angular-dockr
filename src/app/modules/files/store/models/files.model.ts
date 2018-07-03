export interface IFileStatus {
  isLoading: boolean;
  isError: boolean;
  error: string;
}
export interface IFile {
  _id: string;
  name: string;
  ext: string;
  url: string;
}

export interface IFiles {
  files: IFile[];
  status: IFileStatus;
}