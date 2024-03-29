import { ModalComponent } from './../../../core/models/modal-component';
import { ModalParams } from './../../services/modal-generic.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.interface';
import { AppState } from './../../../state/index';
import * as ListsActions from './../../../state/lists/lists.actions';
import { ListsState } from './../../../state/lists/lists.reducer';

@Component({
  selector: 'gl-modal-add-item',
  templateUrl: './modal-add-item.component.html',
  styleUrls: ['./modal-add-item.component.scss']
})
export class ModalAddItemComponent implements OnInit, ModalComponent {
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Input() params: ModalParams;
  form: FormGroup;
  state: ListsState;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', Validators.required],
      iAmount: [null, [Validators.min(1)]]
    });
    this.store.select('listState').subscribe(state => this.state = state);
  }
  onSubmit(): void {
    const item: Partial<Item> = {
      sName: this.form.value.sName,
      iAmount: this.form.value.iAmount,
      bChecked: false,
      dCreated: new Date().getTime(),
    }
    this.params.cb(item);
    this.close.emit();
  }

}
