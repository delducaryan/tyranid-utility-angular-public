import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
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

  @Input() data: BehaviorSubject<{
    onePerModelCount?: number,
    optionReplaced?: number,
    options: BehaviorSubject<{
      enabled: boolean,
      reference: Biomorph | Weapon,
    }[]>,
  }[]>;
  @Input() onePerModelCount: boolean;
  @Input() optionReplaced: boolean;
  @Input() optionsList: (Biomorph | Weapon)[];
  @Input() title: string;

  selectionOpen: boolean[];

  constructor(private cdr: ChangeDetectorRef) {
    this.data = new BehaviorSubject([{ options: new BehaviorSubject([]) }]);
    this.onePerModelCount = false;
    this.optionReplaced = false;
    this.optionsList = [];
    this.selectionOpen = [];
    this.title = '';
  }

  ngOnInit() { }

  addSelection = () => {
    const dataValue = this.data.value;

    dataValue.push({
      onePerModelCount: this.onePerModelCount ? 1 : undefined,
      optionReplaced: this.optionReplaced ? 1 : undefined,
      options: new BehaviorSubject([])
    });
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
