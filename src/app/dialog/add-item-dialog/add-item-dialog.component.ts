import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  item1: any = { id: 1, cap: 10, progress: 0, prod: 1, name: 'item1', style: 'item1 rotated ', direction: 1 };
  item2: any = { id: 2, cap: 10, progress: 0, prod: 1, name: 'item2', style: 'item2', direction: 1 };
  item3: any = { id: 3, vel: 1500, zeroVel: 0, name: 'item3', style: 'item3', totale: 0, direction: 1 };

  res: any;

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item3.totale = this.data.item.totale;
    this.res = this.data.res;
  }

  ngOnInit() {
  }

  pay(toPay) {
    for (let val of Object.keys(this.res)) {
      if (toPay[val]) {
        this.res[val] -= toPay[val];
      }
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
