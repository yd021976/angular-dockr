export interface FileServiceBase {
  find(): any;
  remove(): any;
  patch(): any;
  update(): any
}

export class FileUploadsService implements FileServiceBase {

  constructor(private feathersService: any /** 'feathers type' file-uploads service */) { }
  public find() { }
  public remove() { }
  public patch() { }
  public update() { }
}

/**
 * Just a fake service for if no service server available
 */
export class Fake_FileUploadsService implements FileServiceBase {
  public find() { }
  public remove() { }
  public patch() { }
  public update() { }
}


