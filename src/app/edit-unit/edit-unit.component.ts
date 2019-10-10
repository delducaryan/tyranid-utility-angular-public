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

import { FirestoreService } from '../firestore.service';

import Ability from '../../models/ability';
import Biomorph from '../../models/biomorph';
import Book from '../../models/book';
import Unit from '../../models/unit';
import Weapon from '../../models/weapon';
import { compareByName } from '../../utilities/sort';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {

  @Input() init: Unit;

  readonly separatorKeysCodes: number[] = [
    COMMA,
    ENTER,
  ];

  unit: Unit;
  abilitiesShared: Ability[];
  biomorphs: Biomorph[];
  books: Book[];
  weapons: Weapon[];

  constructor(private fs: FirestoreService) { }

  ngOnInit() {
    if (this.init) {
      this.unit = this.init;
    } else {
      this.unit = new Unit();
    }

    this.abilitiesShared = [];
    this.biomorphs = [];
    this.books = [];
    this.weapons = [];

    this.fs.abilities$.subscribe((value: Ability[]) => {
      this.abilitiesShared = value.sort(compareByName);
    });

    this.fs.biomorphs$.subscribe((value: Biomorph[]) => {
      this.biomorphs = value.sort(compareByName);
    });

    this.fs.books$.subscribe((value: Book[]) => {
      this.books = value.sort(compareByName);
    });

    this.fs.weapons$.subscribe((value: Weapon[]) => {
      this.weapons = value.sort(compareByName);
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

}
