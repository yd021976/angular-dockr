import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { IFile } from '../../store/models/files.model';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.css']
})

export class FileChooserComponent implements OnInit {
  constructor(private store: Store<any>) { }

  ngOnInit() { }

}
