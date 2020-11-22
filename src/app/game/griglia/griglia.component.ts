import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TypeItem } from 'src/app/common/constants/typeItem.enum';
import { AddItemDialogComponent } from 'src/app/dialog/add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-griglia',
  templateUrl: './griglia.component.html',
  styleUrls: ['./griglia.component.css']
})
export class GrigliaComponent implements OnInit {
  grid: any[][] = [];
  @Input() res: any = { wood: 0, stone: 0 };
  @Input() opt: any = { rotate: false };

  listItemProgress: any[] = [];

  constructor(
    public dialog: MatDialog,
  ) {
    for (let i = 0; i < 17; i++) {
      let row = [];
      for (let k = 0; k < 27; k++) {
        let rnd = Math.random();
        let style = "def rotated ";
        let item = { totale: 0, id: null, type: null };
        let pos = { x: k, y: i };

        if (rnd > .95) {
          style += "tree ";
          item.totale = 10;
          item.type = TypeItem.minerals;
          item.id = 4;
        } else if (rnd < .05) {
          style += "stone ";
          item.totale = 10;
          item.type = TypeItem.minerals;
          item.id = 5;
        }
        row.push({ style, item, pos });
      }
      this.grid.push(row);
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.deciSecond();
    }, 100);
  }

  click(zona) {
    if ((zona.item.type === TypeItem.minerals) && this.opt.mine) {
      if (this.mine(zona.item)) {
        zona.style = "def ";
      }
    }
    else
      this.clickZonaItem(zona);
  }

  mine(item) {
    item.totale--;
    if (item.id == 4)
      this.res.wood++;
    else if (item.id == 5)
      this.res.stone++;
    if (item.totale < 1) {
      item.id = null;
      return true;
    }
  }

  clickZonaItem(zona) {
    if (this.opt.rotate && zona.item) {
      this.rotateZona(zona.item);
    } else {
      this.addItem(zona);
    }
  }

  addItem(zona) {
    let dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: { item: zona.item, res: this.res }
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item && item != 'eliminazione') {
        this.listItemProgress.push(zona);
        zona.item = item;
      } else if (item == 'eliminazione') {
        zona.item = { style: "def ", item: { totale: 0 } };
      }
    });
  }

  rotateZona(item) {
    if (item.direction && item.direction != 4) {
      item.direction++;
    } else {
      item.direction = 1;
    }
  }

  deciSecond() {
    for (let zona of this.listItemProgress) {
      if (zona.item.id == 1 || zona.item.id == 2) {
        zona.item.progress++;
      }

      let { dirX, dirY } = this.manageRotation(zona.item);
      let zonaCtrl = this.grid[zona.pos.y + dirY][zona.pos.x + dirX];
      if (zonaCtrl) {
        switch (zona.item.type) {
          case TypeItem.factory:
            this.manageFactory(zona, zonaCtrl);
            break;
          case TypeItem.tapis:
            this.manageTapis(zona, zonaCtrl);
            break;
          case TypeItem.extractor:
            this.manageExtractor(zona, zonaCtrl);
            break;
        }
      }

    }
  }

  manageFactory(zona, zonaCtrl) {
    if (zona.item.progress && zona.item.progress >= zona.item.cap) {
      zonaCtrl.item.totale += zona.item.prod;
      zona.item.progress = 0;
    }
  }

  manageTapis(zona, zonaCtrl) {
    if (zona.item.totale > 0) {
      if (zona.item.vel <= zona.item.zeroVel) {
        zonaCtrl.item.totale += zona.item.totale;
        zona.item.totale = 0;
        zona.item.zeroVel = 0;
      }
      zona.item.zeroVel += 100;
    }
  }

  manageExtractor(zona, zonaCtrl) {
    if (zona.item.toMine > 0) {
      if (zona.item.vel <= zona.item.zeroVel) {
        let qnt = zona.item.prod > zona.item.toMine ? zona.item.toMine : zona.item.prod;
        zonaCtrl.item.totale += qnt;
        zona.item.toMine -= qnt;
        zona.item.zeroVel = 0;
      }
      zona.item.zeroVel += 100;
    }
  }

  manageRotation(item) {
    let dirY = -1;
    let dirX = 0;

    if (item.direction || item.direction == 0) {
      switch (item.direction) {
        case 1: //UP
          dirY = -1;
          dirX = 0;
          break;
        case 2: //RIGHT
          dirY = 0;
          dirX = 1;
          break;
        case 3: //DOWN
          dirY = 1;
          dirX = 0;
          break;
        case 4: //LEFT
          dirY = 0;
          dirX = -1;
          break;
      }
    }

    return { dirX, dirY };
  }

}
