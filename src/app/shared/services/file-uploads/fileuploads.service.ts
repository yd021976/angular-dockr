interface serviceBase {
  find(): any;
  remove(): any;
  patch(): any;
  update(): any
}

export class FileuploadsService implements serviceBase {

  constructor(private feathersService: any /** 'feathers type' file-uploads service */) { }
  public find() { }
  public remove() { }
  public patch() { }
  public update() { }
}

/**
 * Just a fake service for if no service server available
 */
export class Fake_FileuploadsService implements serviceBase {
  public find() { }
  public remove() { }
  public patch() { }
  public update() { }
}
