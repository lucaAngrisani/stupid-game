import { Injectable } from '@angular/core';
import { ItemModel } from '../models/ItemModel';
import { ItemsModel } from '../models/ItemsModel';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  addToTotal(list: ItemsModel[]) {
    for (let items of list) {
      if (items.dependencies) {
        for (let item of items.dependencies) {
          if (item.total > 100) {
            item.total -= 10;
            for (let itemIN of items.items) {
              items.total += itemIN.count * itemIN.val;
            }
          }
        }
      } else {
        for (let item of items.items) {
          items.total += item.count * item.val;
        }
      }
    }
  }

  totalSec(items: ItemModel[]) {
    let totSec = 0;
    for (let item of items) {
      totSec += item.count * item.val;
    }
    return totSec;
  }

  addNewItem(objList: ItemsModel) {
    objList.total -= Math.pow(2, objList.items.length);
    let item = {
      count: 1,
      val: Math.pow(2, objList.items.length) / 10,
      cost: Math.pow(2, objList.items.length)
    };
    objList.items.push(item);
  }

  controlDisabled(objList: ItemsModel) {
    return this.controlNextAmount(objList) > objList.total;
  }

  controlNextAmount(objList: ItemsModel) {
    return Math.pow(2, objList.items.length);
  }

  addItem(objList: ItemsModel, item: ItemModel) {
    objList.total -= item.cost;
    item.count++;
    item.cost++;
  }

  addTotal(items: ItemsModel) {
    items.click++;
    items.total += 1;
  }

  addRate(items: ItemsModel) {
    items.click++;
    if (items.dependencies) {
      for (let item of items.dependencies) {
        if (item.total > 1) {
          item.total -= 1;
          items.total += 1;
        }
      }
    }
  }
  
  /** SEGUENTI NON IN USO */

  addVal(items: ItemsModel, item: ItemModel) {
    items.total -= 10;
    item.val *= 2;
  }

  getVal(item: ItemModel) {
    return Math.pow(1 + item.val, 2) * item.count;
  }

}
