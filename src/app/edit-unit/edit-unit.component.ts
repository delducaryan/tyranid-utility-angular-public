import {
  COMMA,
  ENTER,
} from '@angular/cdk/keycodes';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '../firestore.service';

import { compareByName } from 'src/utilities/sort';
import Ability from 'src/models/ability';
import Biomorph from 'src/models/biomorph';
import Book from 'src/models/book';
import Unit from 'src/models/unit';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {

  @Input() init: Unit;

  readonly separatorKeysCodes: number[] = [
    COMMA,
    ENTER,
  ];

  unit: Unit;
  abilitiesShared: Ability[];
  biomorphsLimited: BehaviorSubject<
    BehaviorSubject<
      {
        enabled: boolean,
        limitPerUnit: number,
        reference: Biomorph,
      }[]
    >[]
  >;
  biomorphsList: Biomorph[];
  books: Book[];
  weapons: BehaviorSubject<
    BehaviorSubject<
      {
        enabled: boolean,
        reference: Weapon,
      }[]
    >[]
  >;
  weaponsLimited: BehaviorSubject<
      BehaviorSubject<
        {
          enabled: boolean,
          limitPerUnit: number,
          optionReplaced: number,
          reference: Weapon,
        }[]
      >[]
  >;
  weaponsList: Weapon[];


  constructor(private fs: FirestoreService) {
    this.abilitiesShared = [];
    this.biomorphsLimited = new BehaviorSubject([new BehaviorSubject([])]);
    this.biomorphsList = [];
    this.books = [];
    this.weapons = new BehaviorSubject([new BehaviorSubject([])]);
    this.weaponsLimited = new BehaviorSubject([new BehaviorSubject([])]);
    this.weaponsList = [];
  }

  ngOnInit() {
    if (this.init) {
      this.unit = this.init;
    } else {
      this.unit = new Unit();
    }

    this.fs.abilities$.subscribe((value: Ability[]) => {
      this.abilitiesShared = value.sort(compareByName);
    });

    this.fs.biomorphs$.subscribe((value: Biomorph[]) => {
      this.biomorphsList = value.sort(compareByName);
    });

    this.fs.books$.subscribe((value: Book[]) => {
      this.books = value.sort(compareByName);
    });

    this.fs.weapons$.subscribe((value: Weapon[]) => {
      this.weaponsList = value.sort(compareByName);
    });

    this.fs.termagants$.subscribe((value: Unit) => {
      this.unit = value;
    });
  }

  addKeyword = (event: MatChipInputEvent) => {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.unit.keywords.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeKeyword = (keyword: string) => {
    const index = this.unit.keywords.indexOf(keyword);

    this.unit.keywords.splice(index, 1);
  }

  clickSave = () => {
    this.unit.biomorphsLimited = [];

    this.biomorphsLimited.value.forEach(item => {
      this.unit.biomorphsLimited.push({
        options: item.value as {
          enabled: boolean,
          limitPerUnit: number,
          reference: Biomorph,
        }[]
      });
    });
  }

}
