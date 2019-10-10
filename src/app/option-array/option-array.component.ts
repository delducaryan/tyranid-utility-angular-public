import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import Biomorph from 'src/models/biomorph';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-option-array',
  templateUrl: './option-array.component.html',
  styleUrls: ['./option-array.component.css']
})
export class OptionArrayComponent implements OnInit {

  @Input() init?: {
    options: {
      enabled: boolean,
      reference: Biomorph | Weapon,
    }[],
  }[];
  @Input() optionsList: (Biomorph | Weapon)[];
  @Input() title: string;

  data: {
    options: {
      enabled: boolean,
      reference: Biomorph | Weapon,
    }[],
  }[];

  constructor() { }

  ngOnInit() {
    if (this.init) {
      this.data = this.init;
    } else {
      this.data = [];
    }
  }

  addSelection = () => {
    this.data.push({ options: [] });
  }

  removeSelection = (index: number) => {
    this.data.splice(index, 1);
  }

}
