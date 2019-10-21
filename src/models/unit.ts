import { DocumentReference } from '@angular/fire/firestore';
import Ability from './ability';
import Biomorph from './biomorph';
import Book from './book';
import Weapon from './weapon';

export default class Unit {
  abilities?: {
    description: string,
    name: string,
  }[];
  abilitiesShared?: (Ability | DocumentReference)[];
  attacks: number;
  ballisticSkill: number;
  biomorphs?: {
    enabled: boolean,
    reference: Biomorph | DocumentReference,
  }[];
  biomorphsLimited?: {
    options: {
      enabled: boolean,
      onePerModelCount: number,
      reference: Biomorph | DocumentReference,
    }[],
  }[];
  book: {
    page: number,
    reference: Book | DocumentReference,
  };
  id: string;
  keywords: string[];
  leadership: number;
  modelsPerUnit: number;
  movement: number;
  name: string;
  pointsPerModel: number;
  save: number;
  strength: number;
  toughness: number;
  unitCapacity: number;
  weaponSkill: number;
  weapons?: {
    options: {
      enabled: boolean,
      reference: Weapon | DocumentReference,
    }[]
  }[];
  weaponsLimited?: {
    options: {
      enabled: boolean,
      onePerModelCount: number,
      optionReplaced: number,
      reference: Weapon | DocumentReference,
    }[]
  }[];
  wounds: number;

  constructor(unit?: Unit) {
    const init = {
      abilities: [],
      abilitiesShared: [],
      attacks: 1,
      ballisticSkill: 4,
      biomorphs: [],
      biomorphsLimited: [],
      book: new Book(),
      id: '',
      keywords: [],
      leadership: 5,
      modelsPerUnit: 1,
      movement: 6,
      name: 'New Unit',
      pointsPerModel: 4,
      save: 6,
      strength: 3,
      toughness: 3,
      unitCapacity: 3,
      weaponSkill: 4,
      weapons: [],
      weaponsLimited: [],
      wounds: 1,
      ...unit,
    };

    Object.assign(this, init);
  }

  getAbilityNames = () => (
    this.abilities.map(ability => (
      ability.name
    )).concat(
      this.abilitiesShared.map(ability => (
        (ability as Ability).name
      ))
    ).sort()
  )

  getBiomorphNames = () => (
    this.biomorphs.map(option => (
      (option.reference as Biomorph).name
    )).sort()
  )

  getLimitedBiomorphNames = (idx: number) => (
    this.biomorphsLimited[idx].options.map(option => (
      (option.reference as Biomorph).name
    )).sort()
  )

  getWeaponNames = (idx: number) => (
    this.weapons[idx].options.map(option => (
      (option.reference as Weapon).name
    )).sort()
  )

  getLimitedWeaponNames = (idx: number) => (
    this.weaponsLimited[idx].options.map(option => (
      (option.reference as Weapon).name
    )).sort()
  )

  getEnabledBiomorphs = () => (
    this.biomorphs.filter(biomorph => biomorph.enabled).concat(
      this.biomorphsLimited.map(item => (
        item.options.find(option => option.enabled)
      ))
    ).sort()
  )

  getEnabledWeapons = () => (
    this.weapons.map(item => (
      item.options.find(option => option.enabled)
    )).concat(
      this.weaponsLimited.map(item => (
        item.options.find(option => option.enabled)
      ))
    ).sort()
  )
}
