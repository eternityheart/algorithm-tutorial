import { Category, Problem } from './types';
import { hashProblems } from './problems/hash';
import { twoPointersProblems } from './problems/two-pointers';
import { slidingWindowProblems } from './problems/sliding-window';
import { substringProblems } from './problems/substring';
import { backtrackingProblems } from './problems/backtracking';
import { binarySearchProblems } from './problems/binary-search';
import { stackProblems } from './problems/stack';
import { heapProblems } from './problems/heap';
import { greedyProblems } from './problems/greedy';
import { binaryTreeProblems } from './problems/binary-tree';
import { linkedListProblems } from './problems/linked-list';
import { dpProblems } from './problems/dp';
import { multidimDpProblems } from './problems/multidim-dp';
import { graphProblems } from './problems/graph';
import { arrayProblems } from './problems/array';
import { matrixProblems } from './problems/matrix';
import { tricksProblems } from './problems/tricks';
import { sortingProblems } from './problems/sorting/index';
import { searchingProblems } from './problems/searching/index';

// Re-export types
export * from './types';

// Total 19 Categories
export const categories: Category[] = [
    { id: 'hash', name: '哈希表', icon: '</>', color: '#ff6b9d', count: hashProblems.length },
    { id: 'two-pointers', name: '双指针', icon: '👉', color: '#ffbe0b', count: twoPointersProblems.length },
    { id: 'sliding-window', name: '滑动窗口', icon: '🪟', color: '#fb5607', count: slidingWindowProblems.length },
    { id: 'substring', name: '子串', icon: '🔤', color: '#8338ec', count: substringProblems.length },
    { id: 'backtracking', name: '回溯', icon: '↩️', color: '#ff006e', count: backtrackingProblems.length },
    { id: 'binary-search', name: '二分查找', icon: '🔍', color: '#3a86ff', count: binarySearchProblems.length },
    { id: 'stack', name: '栈', icon: '📚', color: '#06d6a0', count: stackProblems.length },
    { id: 'heap', name: '堆', icon: '⛰️', color: '#ffd166', count: heapProblems.length },
    { id: 'greedy', name: '贪心算法', icon: '💎', color: '#8338ec', count: greedyProblems.length },
    { id: 'binary-tree', name: '二叉树', icon: '🌲', color: '#ef476f', count: binaryTreeProblems.length },
    { id: 'linked-list', name: '链表', icon: '🔗', color: '#073b4c', count: linkedListProblems.length },
    { id: 'dp', name: '动态规划', icon: '📈', color: '#3a86ff', count: dpProblems.length },
    { id: 'multidim-dp', name: '多维DP', icon: '📊', color: '#9d4edd', count: multidimDpProblems.length },
    { id: 'graph', name: '图论', icon: '🕸️', color: '#118ab2', count: graphProblems.length },
    { id: 'array', name: '普通数组', icon: '🔢', color: '#073b4c', count: arrayProblems.length },
    { id: 'matrix', name: '矩阵', icon: '▦', color: '#118ab2', count: matrixProblems.length },
    { id: 'tricks', name: '技巧', icon: '✨', color: '#ff9f1c', count: tricksProblems.length },
    // Tutorial Categories
    { id: 'sorting', name: '排序算法', icon: '⇅', color: '#a855f7', count: sortingProblems.length },
    { id: 'searching', name: '查找算法', icon: '🔎', color: '#4ecdc4', count: searchingProblems.length },
];

export const problemsData: Record<string, Problem[]> = {
    'hash': hashProblems,
    'two-pointers': twoPointersProblems,
    'sliding-window': slidingWindowProblems,
    'substring': substringProblems,
    'backtracking': backtrackingProblems,
    'binary-search': binarySearchProblems,
    'stack': stackProblems,
    'heap': heapProblems,
    'greedy': greedyProblems,
    'binary-tree': binaryTreeProblems,
    'linked-list': linkedListProblems,
    'dp': dpProblems,
    'multidim-dp': multidimDpProblems,
    'graph': graphProblems,
    'array': arrayProblems,
    'matrix': matrixProblems,
    'tricks': tricksProblems,
    'sorting': sortingProblems,
    'searching': searchingProblems,
};

export const getAllProblems = (): Problem[] => {
    return Object.values(problemsData).flat();
};

export const getProblemsByCategory = (categoryId: string): Problem[] => {
    return problemsData[categoryId] || [];
};
