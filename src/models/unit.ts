import { DocumentReference } from '@angular/fire/firestore';
import Ability from './ability';
import Biomorph from './biomorph';
import Book from './book';
import Weapon from './weapon';
import { compareByVariantName, compareReferencesByVariantName } from 'src/utilities/sort';

export default class Unit {
  abilities?: {
    description: string,
    name: string,
  }[];
  abilitiesShared?: (Ability | DocumentReference)[];
  attacks: number;
  ballisticSkill: number;
  biomorphs?: {
    limited?: {
      onePerModelCount: number,
      options: {
        enabled: boolean,
        reference: Biomorph | DocumentReference,
      }[],
    }[],
    options: {
      enabled: boolean,
      reference: Biomorph | DocumentReference,
    }[],
  };
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
    limited?: {
      onePerModelCount: number,
      options: {
        enabled: boolean,
        reference: Weapon | DocumentReference,
      }[],
    },
    options: {
      enabled: boolean,
      reference: Weapon | DocumentReference,
    }[],
  }[];
  wounds: number;

  constructor(unit?: Unit) {
    const init = {
      abilities: [],
      abilitiesShared: [],
      attacks: 1,
      ballisticSkill: 4,
      biomorphs: [],
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

  // getBiomorphNames = () => (
  //   this.biomorphs.map(option => (
  //     (option.reference as Biomorph).name
  //   )).sort()
  // )

  // getLimitedBiomorphNames = (idx: number) => (
  //   this.biomorphsLimited[idx].options.map(option => (
  //     (option.reference as Biomorph).name
  //   )).sort()
  // )

  // getWeaponNames = (idx: number) => (
  //   this.weapons[idx].options.map(option => (
  //     (option.reference as Weapon).name
  //   )).sort()
  // )

  // getLimitedWeaponNames = (idx: number) => (
  //   this.weapons[idx].limited.options.map(option => (
  //     (option.reference as Weapon).name
  //   )).sort()
  // )

  getEnabledBiomorphs = () => {
    const enabledBiomorphs = [];

    enabledBiomorphs.concat(this.biomorphs.options.filter(option => option.enabled));

    this.biomorphs.limited.forEach(item => {
      enabledBiomorphs.concat(item.options.filter(value => value.enabled));
    });

    return enabledBiomorphs.sort(compareByVariantName);
  }

  getEnabledWeapons = () => (
    (this.weapons.map(item => (
      (item.options.find(option => option.enabled) || item.limited.options.find(option => option.enabled)) as { reference: Weapon }
    ))).sort(compareReferencesByVariantName)
  )
}
