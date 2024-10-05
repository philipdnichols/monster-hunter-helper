import { createContext } from 'react';
import { ISkill } from '../typings/Skills';
import { IArmorSet } from '../typings/ArmorSets';
import { IArmor } from '../typings/Armor';
import { ICharm } from '../typings/Charms';
import { IDecoration } from '../typings/Decorations';

export interface IDataContext {
  skills: ISkill[];
  armorSets: IArmorSet[];
  armors: IArmor[];
  charms: ICharm[];
  decorations: IDecoration[];
}

export const DataContext = createContext<IDataContext>({
  skills: [],
  armorSets: [],
  armors: [],
  charms: [],
  decorations: [],
});
