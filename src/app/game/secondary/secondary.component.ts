import { Component, Input, OnInit } from '@angular/core';
import { ItemsModel } from 'src/app/common/models/ItemsModel';
import { GeneralService } from 'src/app/common/services/general.service';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.scss']
})
export class SecondaryComponent implements OnInit {

  @Input() objList: ItemsModel = {};

  constructor(
    public generalService: GeneralService,
  ) { }

  ngOnInit() { }

}
