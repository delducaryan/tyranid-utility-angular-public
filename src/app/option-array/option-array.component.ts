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
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Biomorph from 'src/models/biomorph';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-option-array',
  animations: [
    trigger('collapse', [
      state('closed', style({
        height: '0',
      })),
      state('open', style({ })),
      transition('closed => open', [
        animate('100ms ease-in-out'),
      ]),
      transition('open => closed', [
        animate('100ms ease-in-out'),
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
        onePerModelCount?: number,
        optionReplaced?: number,
        reference: Biomorph | Weapon,
      }[]
    >[]
  >;
  @Input() optionReplaced: boolean;
  @Input() optionsList: (Biomorph | Weapon)[];
  @Input() title: string;
  @Input() unitLimit: boolean;

  selectionOpen: boolean[];

  constructor(private cdr: ChangeDetectorRef) {
    this.data = new BehaviorSubject([]);
    this.optionReplaced = false;
    this.optionsList = [];
    this.selectionOpen = [];
    this.title = '';
    this.unitLimit = false;
  }

  ngOnInit() { }

  addSelection = () => {
    const dataValue = this.data.value;

    dataValue.push(new BehaviorSubject([]));
    this.data.next(dataValue);
    this.selectionOpen.push(false);
  }

  animateSelection = (index: number, open: boolean) => {
    this.selectionOpen[index] = open;
    this.cdr.detectChanges();
  }

  removeSelection = (index: number) => {
    const dataValue = this.data.value;

    dataValue.splice(index, 1);
    this.data.next(dataValue);
    this.selectionOpen.splice(index, 1);
  }

  getAfterViewInitObject = (index: number) => ({
    index,
    method: this.animateSelection,
  })

}
