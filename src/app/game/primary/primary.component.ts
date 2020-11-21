import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/common/models/ItemModel';
import { ItemsModel } from 'src/app/common/models/ItemsModel';
import { GeneralService } from 'src/app/common/services/general.service';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.scss']
})
export class PrimaryComponent implements OnInit {

  @Input() objList: ItemsModel = {};

  constructor(
    public generalService: GeneralService,
  ) { }

  ngOnInit() { }

}
