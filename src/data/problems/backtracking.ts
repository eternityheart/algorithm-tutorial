import { Problem } from '../types';

export const backtrackingProblems: Problem[] = [
    {
        id: 'permutations',
        title: '全排列',
        difficulty: 'medium',
        category: 'backtracking',
        description: '给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。',
        examples: [{ input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2]...]' }],
        timeComplexity: 'O(n*n!)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '回溯', question: '状态重置', answer: '用过的标记为 true，递归回来标记为 false。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> list = new ArrayList<>();
        backtrack(list, new ArrayList<>(), nums);
        return list;
    }
    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums){
        if(tempList.size() == nums.length){
            list.add(new ArrayList<>(tempList));
        } else{
            for(int i = 0; i < nums.length; i++){ 
                if(tempList.contains(nums[i])) continue; // 简单查重
                tempList.add(nums[i]);
                backtrack(list, tempList, nums);
                tempList.remove(tempList.size() - 1);
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['模板'], template: ['"做选择 -> 递归 -> 撤销选择"'] },
        summary: '回溯基础。'
    },
    {
        id: 'subsets',
        title: '子集',
        difficulty: 'medium',
        category: 'backtracking',
        description: '返回该数组所有可能的子集（幂集）。',
        examples: [],
        timeComplexity: 'O(n*2^n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '选不选', question: '怎么不重复？', answer: '每次循环从 start 开始，只往后选。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> list = new ArrayList<>();
        backtrack(list, new ArrayList<>(), nums, 0);
        return list;
    }
    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, int start){
        list.add(new ArrayList<>(tempList));
        for(int i = start; i < nums.length; i++){
            tempList.add(nums[i]);
            backtrack(list, tempList, nums, i + 1);
            tempList.remove(tempList.size() - 1);
        }
    }
}`,
        interviewTips: { keyPoints: ['start index'], template: ['"避免回头草"'] },
        summary: '子集问题。'
    },
    {
        id: 'letter-combinations-of-a-phone-number',
        title: '电话号码的字母组合',
        difficulty: 'medium',
        category: 'backtracking',
        description: '给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。',
        examples: [{ input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }],
        timeComplexity: 'O(3^N * 4^M)',
        timeExplanation: '',
        spaceComplexity: 'O(N)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '映射', question: '每层做什么？', answer: '取出当前数字对应的字母，尝试每一个。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    String[] mapping = new String[] {"0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public List<String> letterCombinations(String digits) {
        LinkedList<String> ans = new LinkedList<>();
        if (digits.isEmpty()) return ans;
        ans.add("");
        for (int i = 0; i < digits.length(); i++) {
            int x = Character.getNumericValue(digits.charAt(i));
            while (ans.peek().length() == i) {
                String t = ans.remove();
                for (char s : mapping[x].toCharArray()) ans.add(t + s);
            }
        }
        return ans;
    }
}`,
        interviewTips: { keyPoints: ['BFS or DFS'], template: ['"BFS队列解法也很优雅"'] },
        summary: '组合问题。'
    },
    {
        id: 'combination-sum',
        title: '组合总和',
        difficulty: 'medium',
        category: 'backtracking',
        description: '给你一个无重复元素的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合。candidates 中的同一个数字可以无限制重复被选取。',
        examples: [],
        timeComplexity: 'O(S)',
        timeExplanation: '',
        spaceComplexity: 'O(target)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '重复选', question: '怎么允许重复？', answer: '递归时 start 索引不用 +1，因为还可以再选当前这个数。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> list = new ArrayList<>();
        backtrack(list, new ArrayList<>(), candidates, target, 0);
        return list;
    }
    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, int remain, int start){
        if(remain < 0) return;
        else if(remain == 0) list.add(new ArrayList<>(tempList));
        else{
            for(int i = start; i < nums.length; i++){
                tempList.add(nums[i]);
                backtrack(list, tempList, nums, remain - nums[i], i); // 不+1
                tempList.remove(tempList.size() - 1);
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['剪枝'], template: ['"允许重复选->索引不递增"'] },
        summary: '完全背包的可行解打印。'
    },
    {
        id: 'generate-parentheses',
        title: '括号生成',
        difficulty: 'medium',
        category: 'backtracking',
        description: '数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。',
        examples: [{ input: 'n = 3', output: '["((()))","(()())"...]' }],
        timeComplexity: 'O(4^n / √n)',
        timeExplanation: '卡特兰数',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '限制', question: '什么时候能放右括号？', answer: '当右括号数量小于左括号数量时。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> list = new ArrayList<>();
        backtrack(list, "", 0, 0, n);
        return list;
    }
    public void backtrack(List<String> list, String str, int open, int close, int max){
        if(str.length() == max*2){
            list.add(str);
            return;
        }
        if(open < max) backtrack(list, str+"(", open+1, close, max);
        if(close < open) backtrack(list, str+")", open, close+1, max);
    }
}`,
        interviewTips: { keyPoints: ['左右括号数量控制'], template: ['"左边随便放(只要没满)，右边必须比左边少才能放"'] },
        summary: '卡特兰数的生成过程。'
    },
    {
        id: 'word-search',
        title: '单词搜索',
        difficulty: 'medium',
        category: 'backtracking',
        description: '给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。',
        examples: [],
        timeComplexity: 'O(N * 3^L)',
        timeExplanation: '',
        spaceComplexity: 'O(L)',
        spaceExplanation: '',
        thinkingGuide: [{ title: 'DFS', question: '走过的路怎么标记？', answer: '临时标记为 \'#\'，递归返回时还原。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                if (exist(board, i, j, word, 0)) return true;
        return false;
    }
    private boolean exist(char[][] board, int i, int j, String word, int ind) {
        if (ind == word.length()) return true;
        if (i < 0 || j < 0 || i == board.length || j == board[0].length || board[i][j] != word.charAt(ind)) return false;
        
        board[i][j] ^= 256; // mark
        boolean result = exist(board, i+1, j, word, ind+1) ||
                         exist(board, i-1, j, word, ind+1) ||
                         exist(board, i, j+1, word, ind+1) ||
                         exist(board, i, j-1, word, ind+1);
        board[i][j] ^= 256; // unmark
        return result;
    }
}`,
        interviewTips: { keyPoints: ['网格DFS', '异或标记'], template: ['"不使用额外used数组的技巧"'] },
        summary: '网格搜索经典题。'
    },
    {
        id: 'palindrome-partitioning',
        title: '分割回文串',
        difficulty: 'medium',
        category: 'backtracking',
        description: '给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。',
        examples: [{ input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' }],
        timeComplexity: 'O(N * 2^N)',
        timeExplanation: '',
        spaceComplexity: 'O(N)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '切割', question: '在哪里切？', answer: '枚举切割点 i。如果 [start, i] 是回文，则切下来，递归剩下的。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> list = new ArrayList<>();
        backtrack(list, new ArrayList<>(), s, 0);
        return list;
    }
    public void backtrack(List<List<String>> list, List<String> tempList, String s, int start){
        if(start == s.length()) list.add(new ArrayList<>(tempList));
        else{
            for(int i = start; i < s.length(); i++){
                if(isPalindrome(s, start, i)){
                    tempList.add(s.substring(start, i + 1));
                    backtrack(list, tempList, s, i + 1);
                    tempList.remove(tempList.size() - 1);
                }
            }
        }
    }
    public boolean isPalindrome(String s, int low, int high){
        while(low < high) if(s.charAt(low++) != s.charAt(high--)) return false;
        return true;
    }
}`,
        interviewTips: { keyPoints: ['判定回文'], template: ['"枚举切割线"'] },
        summary: '组合与判定的结合。'
    },
    {
        id: 'n-queens',
        title: 'N 皇后',
        difficulty: 'hard',
        category: 'backtracking',
        description: 'N 皇后问题。',
        examples: [],
        timeComplexity: 'O(N!)',
        timeExplanation: '',
        spaceComplexity: 'O(N)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '攻击判定', question: '三个方向', answer: '列、主对角线、副对角线不能有皇后。可以用三个boolean数组记录。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for(int i = 0; i < n; i++)
            for(int j = 0; j < n; j++)
                board[i][j] = '.';
        List<List<String>> res = new ArrayList<List<String>>();
        dfs(board, 0, res);
        return res;
    }
    private void dfs(char[][] board, int colIndex, List<List<String>> res) {
        if(colIndex == board.length) {
            res.add(construct(board));
            return;
        }
        for(int i = 0; i < board.length; i++) {
            if(validate(board, i, colIndex)) {
                board[i][colIndex] = 'Q';
                dfs(board, colIndex + 1, res);
                board[i][colIndex] = '.';
            }
        }
    }
    private boolean validate(char[][] board, int x, int y) {
        for(int i = 0; i < board.length; i++) {
            for(int j = 0; j < y; j++) {
                if(board[i][j] == 'Q' && (x + j == y + i || x + y == i + j || x == i))
                    return false;
            }
        }
        return true;
    }
    private List<String> construct(char[][] board) {
        List<String> res = new ArrayList<String>();
        for(int i = 0; i < board.length; i++) res.add(new String(board[i]));
        return res;
    }
}`,
        interviewTips: { keyPoints: ['经典回溯'], template: ['"逐列尝试，检查冲突"'] },
        summary: '回溯算法的集大成者。'
    }
];
