import { Problem } from '../types';

export const multidimDpProblems: Problem[] = [
    {
        id: 'unique-paths',
        title: '不同路径',
        difficulty: 'medium',
        category: 'multidim-dp',
        description: '一个机器人位于一个 m x n 网格的左上角。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。问总共有多少条不同的路径？',
        examples: [{ input: 'm = 3, n = 7', output: '28' }],
        timeComplexity: 'O(m*n)',
        timeExplanation: '填满网格',
        spaceComplexity: 'O(n)',
        spaceExplanation: '优化后只需一行',
        thinkingGuide: [
            { title: '来源', question: '怎么到达 (i, j)？', answer: '只能从上方 (i-1, j) 或 左方 (i, j-1) 过来。' },
            { title: '方程', question: 'dp[i][j] = ?', answer: 'dp[i-1][j] + dp[i][j-1]' }
        ],
        codeImplementation: [
            { title: '边界初始化', code: 'dp[0][j] = 1; dp[i][0] = 1;', explanation: '第一行第一列都只有1种走法' }
        ],
        fullCode: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        // 初始化第一行
        for (int j = 0; j < n; j++) dp[j] = 1;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                // dp[j] (新) = dp[j] (旧，即上方) + dp[j-1] (新，即左方)
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`,
        interviewTips: { keyPoints: ['组合数学解法C(m+n-2, m-1)', '空间压缩技巧'], template: ['"典型二维DP，状态转移明确"'] },
        summary: '二维网格DP的入门题。'
    },
    {
        id: 'minimum-path-sum',
        title: '最小路径和',
        difficulty: 'medium',
        category: 'multidim-dp',
        description: '给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移动一步。',
        examples: [{ input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7', explanation: '1→3→1→1→1' }],
        timeComplexity: 'O(m*n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地修改grid',
        thinkingGuide: [
            { title: '最优子结构', question: '要使得到达 (i, j) 最小，前一步该选哪个？', answer: '选上面和左面中较小的那个。' }
        ],
        codeImplementation: [
            { title: '方程', code: 'grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);', explanation: '直接累加状态' }
        ],
        fullCode: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                else if (i == 0) grid[i][j] += grid[i][j - 1]; // 第一行只能从左边
                else if (j == 0) grid[i][j] += grid[i - 1][j]; // 第一列只能从上边
                else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m - 1][n - 1];
    }
}`,
        interviewTips: { keyPoints: ['原地修改节省空间', '注意边界初始化'], template: ['"贪心不行，必须全局规划"'] },
        summary: '经典的最短路径DP问题。'
    },
    {
        id: 'longest-palindromic-substring',
        title: '最长回文子串',
        difficulty: 'medium',
        category: 'multidim-dp',
        description: '给你一个字符串 s，找到 s 中最长的回文子串。',
        examples: [{ input: 's = "babad"', output: '"bab"' }],
        timeComplexity: 'O(n²)',
        timeExplanation: '中心扩展或DP',
        spaceComplexity: 'O(1)',
        spaceExplanation: '中心扩展法',
        thinkingGuide: [
            { title: '中心扩展', question: '回文串有什么特点？', answer: '关于中心对称。我们可以枚举每一个中心，向两边扩展。' }
        ],
        codeImplementation: [
            { title: '扩展', code: 'while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r))', explanation: '左右相等则继续' }
        ],
        fullCode: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            // 奇数长度中心
            int len1 = expandAroundCenter(s, i, i);
            // 偶数长度中心
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return R - L - 1;
    }
}`,
        interviewTips: { keyPoints: ['DP法O(n²)但空间也O(n²)', '中心扩展法空间O(1)', 'Manacher算法O(n)'], template: ['"中心扩展法最直观"'] },
        summary: '字符串处理的经典题目，考察对回文特性的利用。'
    },
    {
        id: 'longest-common-subsequence',
        title: '最长公共子序列',
        difficulty: 'medium',
        category: 'multidim-dp',
        description: '给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。',
        examples: [{ input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: '"ace"' }],
        timeComplexity: 'O(m*n)',
        timeExplanation: '',
        spaceComplexity: 'O(m*n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '状态定义', question: 'dp[i][j] 表示什么？', answer: 'text1[0..i-1] 和 text2[0..j-1] 的 LCS 长度。' },
            { title: '转移', question: '如果 t1[i] == t2[j]？', answer: '那就 +1；否则 max(去掉t1[i], 去掉t2[j])。' }
        ],
        codeImplementation: [
            { title: '匹配', code: 'if (c1 == c2) dp[i][j] = dp[i-1][j-1] + 1;', explanation: '找到一个公共字符' }
        ],
        fullCode: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            char c1 = text1.charAt(i - 1);
            for (int j = 1; j <= n; j++) {
                char c2 = text2.charAt(j - 1);
                if (c1 == c2) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
        interviewTips: { keyPoints: ['这是序列DP的母题', '记住二维表格填表过程'], template: ['"相等则加一，不等取最大"'] },
        summary: '所有的"两个字符串"的DP问题大多源于此题。'
    },
    {
        id: 'edit-distance',
        title: '编辑距离',
        difficulty: 'hard',
        category: 'multidim-dp',
        description: '给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  （插入、删除、替换）。',
        examples: [{ input: 'word1 = "horse", word2 = "ros"', output: '3' }],
        timeComplexity: 'O(m*n)',
        timeExplanation: '',
        spaceComplexity: 'O(m*n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '三种操作', question: '怎么对应DP？', answer: 'dp[i-1][j] (删除), dp[i][j-1] (插入), dp[i-1][j-1] (替换)。' }
        ],
        codeImplementation: [
            { title: '取最小', code: 'dp[i][j] = min(del, ins, rep) + 1;', explanation: '选择代价最小的操作' }
        ],
        fullCode: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j - 1], 
                               Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;
                }
            }
        }
        return dp[m][n];
    }
}`,
        interviewTips: { keyPoints: ['理解三种操作的DP映射', 'Levenshtein距离'], template: ['"增删改分别对应三个方向的转移"'] },
        summary: '编辑距离是衡量字符串相似度的标准算法。'
    }
];
