import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { FirestoreService } from '../firestore.service';

import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-edit-weapons',
  templateUrl: './edit-weapons.component.html',
  styleUrls: ['./edit-weapons.component.scss']
})
export class EditWeaponsComponent implements OnInit {

  @Input() data: {
    limited?: {
      onePerModelCount: number,
      options: {
        reference: Weapon,
      }[],
    },
    options: {
      enabled: boolean,
      reference: Weapon,
    }[],
  }[];
  @Input() weaponsList: Weapon[];

  constructor(private fs: FirestoreService) {
    this.data = [];

    this.weaponsList = [];

    fs.weapons$.subscribe(value => {
      this.weaponsList = value;
    });
  }

  ngOnInit() { }

  addSelection = () => {
    this.data.push({ options: [] });
  }

  removeSelection = (index: number) => {
    this.data.splice(index, 1);
  }

}
