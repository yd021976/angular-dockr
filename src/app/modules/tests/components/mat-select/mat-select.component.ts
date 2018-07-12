import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss']
})
export class MatSelectComponent implements OnInit {
  public selectValues: Array<any> = [
    { id: "1", name: "toto", zones: [] },
    { id: "2", name: "titi", zones: [] }
  ];
  public selectValues2: Array<any> = [
    { id: "1", name: "toto", zones: [] },
    { id: "2", name: "titi", zones: [] }
  ]
  public selectedValue: any = {};
  public valueToSelect: string = "";
  constructor() { }

  ngOnInit() {
  }
  selectValue() {
    var obj = this.selectValues2.find((value) => {
      return value.id == this.valueToSelect;
    });
    // obj = { id: "1", name: "toto", zones: [] }

    this.selectedValue = obj;
  }
  compareFn(option1, option2) {
    return option1.id == option2.id
  }
}
