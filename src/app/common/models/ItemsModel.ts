import { ItemModel } from './ItemModel';

export interface ItemsModel {
    total?: number;
    click?: number;
    name?: string;
    dependencies?: ItemsModel[];
    items?: ItemModel[];
}
