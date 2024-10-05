import { createContext } from 'react';
import { ISkill } from '../typings/Skills';
import { IArmorSet } from '../typings/ArmorSets';
import { IArmor } from '../typings/Armor';
import { ICharm } from '../typings/Charms';
import { IDecoration } from '../typings/Decorations';

export interface ISkillMapping {
  [id: number]: ISkill;
}

export interface IArmorSetMapping {
  [id: number]: IArmorSet;
}

export interface IArmorMapping {
  [id: number]: IArmor;
}

export interface ICharmMapping {
  [id: number]: ICharm;
}

export interface IDecorationMapping {
  [id: number]: IDecoration;
}

export interface IDataContext {
  skills: ISkillMapping;
  armorSets: IArmorSetMapping;
  armors: IArmorMapping;
  charms: ICharmMapping;
  decorations: IDecorationMapping;
}

export const DataContext = createContext<IDataContext>({
  skills: {},
  armorSets: {},
  armors: {},
  charms: {},
  decorations: {},
});
