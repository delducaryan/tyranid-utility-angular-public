import Ability from './ability';
import Biomorph from './biomorph';
import Book from './book';
import Weapon from './weapon';

export default class Unit {
  abilities: {
    description: string,
    name: string,
  }[];
  abilitiesShared: {
    reference: Ability,
  }[];
  attacks: number;
  ballisticSkill: number;
  biomorphs: {
    enabled: boolean,
    reference: Biomorph,
  }[];
  biomorphsLimited: {
    options: {
      enabled: boolean,
      limitPerUnit: number,
      reference: Biomorph,
    }[],
  }[];
  book: Book;
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
  weapons: {
    options: {
      enabled: boolean,
      reference: Weapon,
    }[]
  }[];
  weaponsLimited: {
    options: {
      enabled: boolean,
      limitPerUnit: number,
      reference: Weapon,
    }[]
  }[];
  wounds: number;

  constructor(unit?: Partial<Unit>) {
    const init = {
      abilities: [],
      abilitiesShared: [],
      attacks: 1,
      ballisticSkill: 4,
      biomorphs: [],
      biomorphsLimited: [],
      book: new Book(),
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
        ability.reference.name
      ))
    ).sort()
  )

  getBiomorphNames = () => (
    this.biomorphs.map(option => (
      option.reference.name
    )).sort()
  )

  getLimitedBiomorphNames = (idx: number) => (
    this.biomorphsLimited[idx].options.map(option => (
      option.reference.name
    )).sort()
  )

  getWeaponNames = (idx: number) => (
    this.weapons[idx].options.map(option => (
      option.reference.name
    )).sort()
  )

  getLimitedWeaponNames = (idx: number) => (
    this.weaponsLimited[idx].options.map(option => (
      option.reference.name
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
