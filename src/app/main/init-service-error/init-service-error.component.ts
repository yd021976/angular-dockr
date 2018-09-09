import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-init-service-error',
  templateUrl: './init-service-error.component.html',
  styleUrls: ['./init-service-error.component.scss']
})

export class InitServiceErrorComponent implements OnInit {
  @Input() connectionAttemptCount: number;

  constructor(
    public dialogRef: MatDialogRef<InitServiceErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { connectionAttemptCount: number }) {
    this.connectionAttemptCount = data.connectionAttemptCount;
  }

  ngOnInit() { }

}
