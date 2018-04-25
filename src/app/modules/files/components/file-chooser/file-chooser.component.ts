import { Component, OnInit } from '@angular/core';
import { IFile } from '../../store/models/files.models';
@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss']
})
export class FileChooserComponent implements OnInit {
  public filess: IFile;
  constructor() { }

  ngOnInit() {
  }

}
