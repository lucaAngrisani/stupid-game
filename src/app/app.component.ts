import { Component } from '@angular/core';
import { ItemsModel } from './common/models/ItemsModel';
import { GeneralService } from './common/services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*   listItem: ItemsModel[] = [{ total: 0, items: [], name: 'P' }, { total: 0, items: [], name: 'S' }];
    milliSeconds: number = 1000; */

  style: string = 'sg-map ';
  opt: any = { rotate: false };
  res: any = { wood: 10, flex: 10 };

  constructor(
    public generalService: GeneralService,
  ) {
    /*     this.listItem[1].dependencies = [];
        this.listItem[1].dependencies.push(this.listItem[0]); */
  }

  ngOnInit() {
    /*     setInterval(() => {
          this.generalService.addToTotal(this.listItem);
        }, this.milliSeconds); */
  }
}
