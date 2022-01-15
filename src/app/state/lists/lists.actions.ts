import { Item } from '../../core/models/item.interface';
import { List } from './../../core/models/list.interface';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
export const Add = createAction('[LISTS] ADD', props<{ payload: { list: List, sUserID: string } }>());
export const ListAdded = createAction('[LISTS] LIST ADDED', props<{ payload: List }>());
export const Remove = createAction('[LISTS] REMOVE', props<{ payload: List }>());
export const setCurrentList = createAction('[LISTS] SET CURRENT', props<{ payload: number }>());
export const AddItemToList = createAction('[LISTS] ADD ITEM TO LIST', props<{ payload: { listID: string, item: Item } }>());
export const ItemsAddedToList = createAction('[LISTS] ITEM ADDED TO LIST', props<{ payload: List }>());
export const RemoveItemsFromList = createAction('[LISTS] REMOVE ITEM FROM LIST', props<{ payload: { listID: string, items: Item[] } }>());
export const ItemsRemovedFromList = createAction('[LISTS] ITEM REMOVED FROM LIST', props<{ payload: List }>());
export const Load = createAction('[LISTS] LOAD', props<{ sUserID: string }>());
export const Loaded = createAction('[LISTS] LOADED', props<{ payload: List[] }>());
export const AddLists = createAction('[LISTS] ADD MANY', props<{ payload: List[] }>());
export const Reset = createAction('[LISTS RESET');
