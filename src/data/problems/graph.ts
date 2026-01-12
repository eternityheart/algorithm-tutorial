import { Problem } from '../types';

export const graphProblems: Problem[] = [
    {
        id: 'number-of-islands',
        title: '岛屿数量',
        difficulty: 'medium',
        category: 'graph',
        description: '给你一个由 \'1\'（陆地）和 \'0\'（水）组成的的二维网格，请你计算网格中岛屿的数量。',
        examples: [{ input: 'grid = [["1","1","0"],["1","0","0"]]', output: '2' }],
        timeComplexity: 'O(m×n)',
        timeExplanation: '',
        spaceComplexity: 'O(m×n)',
        spaceExplanation: '递归栈',
        thinkingGuide: [
            { title: '沉岛', question: 'DFS时要做什么？', answer: '把遍历过的 1 变成 0，防止重复计数。' }
        ],
        codeImplementation: [
            { title: 'DFS', code: 'grid[i][j] = \'0\'; dfs(grid, i+1, j); ...', explanation: '淹没' }
        ],
        fullCode: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for(int i=0; i<grid.length; i++)
            for(int j=0; j<grid[0].length; j++)
                if(grid[i][j] == '1'){
                    dfs(grid, i, j);
                    count++;
                }
        return count;
    }
    private void dfs(char[][] grid, int i, int j){
        if(i<0 || j<0 || i>=grid.length || j>=grid[0].length || grid[i][j]=='0') return;
        grid[i][j] = '0';
        dfs(grid, i+1, j);
        dfs(grid, i-1, j);
        dfs(grid, i, j+1);
        dfs(grid, i, j-1);
    }
}`,
        interviewTips: { keyPoints: ['网格DFS', '沉岛技巧'], template: ['"遍历，遇到陆地，计数+1并把周围全炸平"'] },
        summary: '网格搜索入门。'
    },
    {
        id: 'rotting-oranges',
        title: '腐烂的橘子',
        difficulty: 'medium',
        category: 'graph',
        description: '在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：0-空，1-新鲜，2-腐烂。每分钟，腐烂的橘子周围 4 个方向上相邻的新鲜橘子都会腐烂。返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。',
        examples: [{ input: '[[2,1,1],[1,1,0],[0,1,1]]', output: '4' }],
        timeComplexity: 'O(mn)',
        timeExplanation: '',
        spaceComplexity: 'O(mn)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: 'BFS', question: '为什么是BFS？', answer: '因为是求"层数"（分钟数）扩散，像水波纹一样。' }
        ],
        codeImplementation: [],
        fullCode: `import java.util.*;
class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int freshCount = 0;
        
        for(int i=0; i<m; i++)
            for(int j=0; j<n; j++)
                if(grid[i][j] == 2) queue.offer(new int[]{i,j});
                else if(grid[i][j] == 1) freshCount++;
        
        if(freshCount == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        
        while(!queue.isEmpty() && freshCount > 0){
            minutes++;
            int size = queue.size();
            for(int i=0; i<size; i++){
                int[] curr = queue.poll();
                for(int[] d : dirs){
                    int r = curr[0]+d[0], c = curr[1]+d[1];
                    if(r>=0 && r<m && c>=0 && c<n && grid[r][c] == 1){
                        grid[r][c] = 2;
                        queue.offer(new int[]{r,c});
                        freshCount--;
                    }
                }
            }
        }
        return freshCount == 0 ? minutes : -1;
    }
}`,
        interviewTips: { keyPoints: ['多源BFS'], template: ['"所有腐烂橘子一起入队，层级扩散"'] },
        summary: '多源BFS经典题目。'
    },
    {
        id: 'course-schedule',
        title: '课程表',
        difficulty: 'medium',
        category: 'graph',
        description: '你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。在选修某些课程之前需要一些先修课程。请你判断是否可能完成所有课程的学习？',
        examples: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' }],
        timeComplexity: 'O(V+E)',
        timeExplanation: '',
        spaceComplexity: 'O(V+E)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '拓扑排序', question: '什么是依赖关系？', answer: '有向图。能否修完课 = 有没有环。' },
            { title: '入度', question: '从哪门课开始修？', answer: '入度为 0 的课（没有先修课）。' }
        ],
        codeImplementation: [],
        fullCode: `import java.util.*;
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for(int i=0; i<numCourses; i++) adj.add(new ArrayList<>());
        
        for(int[] edge : prerequisites){
            indegree[edge[0]]++;
            adj.get(edge[1]).add(edge[0]);
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for(int i=0; i<numCourses; i++)
            if(indegree[i] == 0) queue.offer(i);
            
        int count = 0;
        while(!queue.isEmpty()){
            int curr = queue.poll();
            count++;
            for(int neighbor : adj.get(curr)){
                indegree[neighbor]--;
                if(indegree[neighbor] == 0) queue.offer(neighbor);
            }
        }
        return count == numCourses;
    }
}`,
        interviewTips: { keyPoints: ['拓扑排序', '入度表'], template: ['"BFS剥洋葱，先把入度0的拿掉"'] },
        summary: '拓扑排序模板题。'
    },
    {
        id: 'implement-trie-prefix-tree',
        title: '实现 Trie (前缀树)',
        difficulty: 'medium',
        category: 'graph',
        description: 'Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。',
        examples: [{ input: 'insert("apple"), search("apple"), startsWith("app")', output: 'true' }],
        timeComplexity: 'O(L)',
        timeExplanation: '单词长度',
        spaceComplexity: 'O(N*L)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '节点结构', question: '孩子怎么存？', answer: 'Children[26] 数组。' }
        ],
        codeImplementation: [],
        fullCode: `class Trie {
    class TrieNode {
        boolean isEnd;
        TrieNode[] children = new TrieNode[26];
    }
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) {
                node.children[c - 'a'] = new TrieNode();
            }
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }
    
    private TrieNode searchPrefix(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) return null;
            node = node.children[c - 'a'];
        }
        return node;
    }
}`,
        interviewTips: { keyPoints: ['多叉树应用'], template: ['"26叉树，路径即字符"'] },
        summary: '前缀树是自动补全、拼写检查的核心结构。'
    }
];
