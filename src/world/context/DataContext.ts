import { createContext } from 'react';
import { ISkill } from '../typings/Skills';
import { IArmorSet } from '../typings/ArmorSets';
import { IArmor } from '../typings/Armor';

export interface IDataContext {
  skills: ISkill[];
  armorSets: IArmorSet[];
  armors: IArmor[];
}

export const DataContext = createContext<IDataContext>({
  skills: [],
  armorSets: [],
  armors: [],
});
