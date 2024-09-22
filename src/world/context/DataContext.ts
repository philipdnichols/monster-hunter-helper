import { createContext } from 'react';
import { ISkill } from '../typings/Skills';
import { IArmorSet } from '../typings/ArmorSets';

export interface IDataContext {
  skills: ISkill[];
  armorSets: IArmorSet[];
}

export const DataContext = createContext<IDataContext>({
  skills: [],
  armorSets: [],
});
