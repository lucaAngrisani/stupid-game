import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/common/services/general.service';

@Component({
  selector: 'app-tertiary',
  templateUrl: './tertiary.component.html',
  styleUrls: ['./tertiary.component.scss']
})
export class TertiaryComponent implements OnInit {

  @Input() items: any[] = [];
  total: number = 0;
  nClick: number = 0;

  milliSeconds: number = 1000;

  constructor(
    public generalService: GeneralService,
  ) { }

  ngOnInit() { }

  addItem(item: any) {
    this.total -= item.cost;
    item.count++;
    item.cost++;
  }

  addVal(item: any) {
    this.total -= Math.pow(2, this.items.length) * 10;
    item.val *= 2;
  }

  getVal(item: any) {
    return Math.pow(1 + item.val, 2) * item.count;
  }

  addTotal() {
    this.nClick++;
    this.total += 1;
  }

  addToTotal() {
    for (let item of this.items) {
      this.total += item.count * item.val;
    }
  }

  addNewItem() {
    this.total -= Math.pow(2, this.items.length);
    let item = {
      count: 1,
      val: Math.pow(2, this.items.length) / 10,
      cost: Math.pow(2, this.items.length)
    };
    this.items.push(item);
  }

  controlNextAmount() {
    return Math.pow(2, this.items.length);
  }

  controlDisabled() {
    return this.controlNextAmount() > this.total;
  }

  totaleSec() {
    let totSec = 0;
    for (let item of this.items) {
      totSec += item.count * item.val;
    }
    return totSec;
  }

}
