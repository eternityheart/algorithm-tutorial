import { basicSearchingProblems } from './basic';
import { hashSearchingProblem } from './hash';
import { treeSearchingProblems } from './tree';

export const searchingProblems = [
    ...basicSearchingProblems,
    hashSearchingProblem,
    ...treeSearchingProblems
];
