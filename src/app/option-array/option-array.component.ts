import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Biomorph from 'src/models/biomorph';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-option-array',
  animations: [
    trigger('expand', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
      })),
      state('open', style({
        height: '*',
        overflow: 'hidden',
      })),
      transition('closed => open', [
        animate('100ms'),
      ]),
      transition('open => closed', [
        animate('1000ms'),
      ]),
    ]),
  ],
  templateUrl: './option-array.component.html',
  styleUrls: ['./option-array.component.scss']
})
export class OptionArrayComponent implements OnInit {

  @Input() data: BehaviorSubject<
    BehaviorSubject<
      {
        enabled: boolean,
        reference: Biomorph | Weapon,
      }[]
    >[]
  >;
  @Input() optionsList: (Biomorph | Weapon)[];
  @Input() title: string;
  @Input() unitLimit: boolean;

  open: boolean;

  constructor() {
    this.data = new BehaviorSubject([]);
    this.optionsList = [];
    this.title = '';
    this.unitLimit = false;
    this.open = false;
  }

  ngOnInit() { }

  addSelection = () => {
    const dataValue = this.data.value;

    dataValue.push(new BehaviorSubject([]));
    this.data.next(dataValue);
  }

  toggleOpen = () => {
    this.open = !this.open;
  }

  removeSelection = (index: number) => {
    const dataValue = this.data.value;

    dataValue.splice(index, 1);
    this.data.next(dataValue);
  }

}
