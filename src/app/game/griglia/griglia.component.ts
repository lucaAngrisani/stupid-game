import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from 'src/app/dialog/add-item-dialog/add-item-dialog.component';
import { idText } from 'typescript';

@Component({
  selector: 'app-griglia',
  templateUrl: './griglia.component.html',
  styleUrls: ['./griglia.component.css']
})
export class GrigliaComponent implements OnInit {
  grid: any[][] = [];
  @Input() res: any = { wood: 0, flex: 0 };
  @Input() opt: any = { rotate: false };

  constructor(
    public dialog: MatDialog,
  ) {
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let k = 0; k < 18; k++) {
        let rnd = Math.random();
        let style = "def rotated ";
        let item = { totale: 0, id: null };

        if (rnd > .95) {
          style += "tree ";
          item.totale = 10;
          item.id = 4;
        } else if (rnd < .05) {
          style += "flex ";
          item.totale = 10;
          item.id = 5;
        }
        row.push({ style, item });
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
    if (zona.item.id == 4 || zona.item.id == 5) {
      if (this.mine(zona.item)) {
        zona.style = "def ";
      }
    }
    else
      this.addItem(zona);
  }

  mine(item) {
    item.totale--;
    if (item.id == 4)
      this.res.wood++;
    else if (item.id == 5)
      this.res.flex++;
    if (item.totale < 1) {
      item.id = null;
      return true;
    }
  }

  addItem(zona) {
    if (this.opt.rotate && zona.item) {
      this.rotateZona(zona.item);
    } else {

      let dialogRef = this.dialog.open(AddItemDialogComponent, {
        data: { item: zona.item, res: this.res }
      });
      dialogRef.afterClosed().subscribe(item => {
        if (item && item != 'eliminazione') {
          zona.item = item;
        } else if (item == 'eliminazione') {
          zona.item = { style: "def ", item: { totale: 0 } };
        }
      })
    }
  }

  rotateZona(item) {
    if (item.direction && item.direction != 4) {
      item.direction++;
    } else {
      item.direction = 1;
    }
  }

  deciSecond() {
    this.grid.map((row, rowK) => {
      row.map((zona, key) => {
        if (zona.item?.id) {
          if (zona.item.id == 1 || zona.item.id == 2) {
            zona.item.progress++;
          }

          let { dirX, dirY } = this.manageRotation(zona.item);

          if (zona.item.id === 3 && zona.item.totale > 0 && this.grid[rowK + dirY][key + dirX]) {
            if (zona.item.vel <= zona.item.zeroVel) {
              this.grid[rowK + dirY][key + dirX].item.totale += zona.item.totale;
              zona.item.totale = 0;
              zona.item.zeroVel = 0;
            }
            zona.item.zeroVel += 100;
          }

          else if (zona.item.id && zona.item.progress && zona.item.progress >= zona.item.cap && this.grid[rowK + dirY][key + dirX]) {
            this.grid[rowK + dirY][key + dirX].item.totale += zona.item.prod;
            zona.item.progress = 0;
          }
        }
      })
    })
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
