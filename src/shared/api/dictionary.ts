import dictionaryData from '../../dictionary.json';
import { Dictionary } from '../types';

export const getDictionary = (): Dictionary => {
  return dictionaryData as Dictionary;
};
