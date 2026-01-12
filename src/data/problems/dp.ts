import { Problem } from '../types';

export const dpProblems: Problem[] = [
    {
        id: 'climbing-stairs',
        title: '爬楼梯',
        difficulty: 'easy',
        category: 'dp',
        description: '假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？',
        examples: [{ input: 'n = 2', output: '2', explanation: '1. 1+1, 2. 2' }],
        timeComplexity: 'O(n)',
        timeExplanation: '一次循环',
        spaceComplexity: 'O(1)',
        spaceExplanation: '滚动变量',
        thinkingGuide: [
            { title: '递推公式', question: '第n阶如果不动，可以从哪来？', answer: '从 n-1 爬1步，或者从 n-2 爬2步。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;
        int prev = 1, curr = 1;
        for (int i = 2; i <= n; i++) {
            int next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
}`,
        interviewTips: { keyPoints: ['斐波那契数列'], template: ['"f(n) = f(n-1) + f(n-2)"'] },
        summary: 'DP入门第一题。'
    },
    {
        id: 'pascals-triangle',
        title: '杨辉三角',
        difficulty: 'easy',
        category: 'dp',
        description: '生成杨辉三角的前 numRows 行。',
        examples: [{ input: 'numRows = 5', output: '[[1],[1,1],[1,2,1]...]' }],
        timeComplexity: 'O(n²)',
        timeExplanation: '',
        spaceComplexity: 'O(n²)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '规律', question: '每个数怎么算？', answer: '等于肩上两个数之和。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else {
                    List<Integer> prevRow = res.get(i - 1);
                    row.add(prevRow.get(j - 1) + prevRow.get(j));
                }
            }
            res.add(row);
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['组合数'], template: ['"每个数等于上一行左右两数和"'] },
        summary: '数学与DP的结合。'
    },
    {
        id: 'house-robber',
        title: '打家劫舍',
        difficulty: 'medium',
        category: 'dp',
        description: '你是一个专业的小偷... 不能偷相邻的房间。计算在不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。',
        examples: [{ input: 'nums = [1,2,3,1]', output: '4' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '选择', question: '对于第 i 间房，偷还是不偷？', answer: '偷 -> nums[i] + dp[i-2]。不偷 -> dp[i-1]。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int curr = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
        interviewTips: { keyPoints: ['状态定义'], template: ['"偷i则不能偷i-1"'] },
        summary: '经典的一维DP。'
    },
    {
        id: 'perfect-squares',
        title: '完全平方数',
        difficulty: 'medium',
        category: 'dp',
        description: '给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。',
        examples: [{ input: 'n = 12', output: '3', explanation: '4+4+4' }],
        timeComplexity: 'O(n√n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '类比', question: '像什么题？', answer: '像零钱兑换。硬币面额是 1, 4, 9, 16...' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, n); // 最坏情况是n个1
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
            }
        }
        return dp[n];
    }
}`,
        interviewTips: { keyPoints: ['背包问题变体'], template: ['"凑硬币问题，硬币是平方数"'] },
        summary: '完全背包问题的变形。'
    },
    {
        id: 'coin-change',
        title: '零钱兑换',
        difficulty: 'medium',
        category: 'dp',
        description: '计算并返回可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1 。',
        examples: [{ input: 'coins = [1, 2, 5], amount = 11', output: '3' }],
        timeComplexity: 'O(S*n)',
        timeExplanation: '',
        spaceComplexity: 'O(S)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '状态', question: 'dp[i] 是什么？', answer: '凑成金额 i 所需的最少硬币数。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        interviewTips: { keyPoints: ['完全背包'], template: ['"dp[i] = min(dp[i-coin]) + 1"'] },
        summary: '完全背包最典型题目。'
    },
    {
        id: 'word-break',
        title: '单词拆分',
        difficulty: 'medium',
        category: 'dp',
        description: '判断 s 是否可以被空格拆分为一个或多个在字典中出现的单词。',
        examples: [{ input: 's = "leetcode", wordDict = ["leet", "code"]', output: 'true' }],
        timeComplexity: 'O(n^2)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '分割点', question: '怎么判断前 i 个字符可拆？', answer: '枚举分割点 j，如果 s[0..j] 可拆且 s[j..i] 在字典里，则 s[0..i] 可拆。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`,
        interviewTips: { keyPoints: ['DP'], template: ['"枚举分割点"'] },
        summary: '字符串DP经典题。'
    },
    {
        id: 'longest-increasing-subsequence',
        title: '最长递增子序列',
        difficulty: 'medium',
        category: 'dp',
        description: '给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。',
        examples: [{ input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101]' }],
        timeComplexity: 'O(n²)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '状态', question: 'dp[i] 是什么？', answer: '以 nums[i] 结尾的最长递增子序列长度。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        int res = 0;
        Arrays.fill(dp, 1);
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            res = Math.max(res, dp[i]);
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['有O(nlogn)贪心解法'], template: ['"dp[i]接在所有比它小的数后面"'] },
        summary: '基础DP题，也可以用贪心+二分优化。'
    },
    {
        id: 'maximum-product-subarray',
        title: '乘积最大子数组',
        difficulty: 'medium',
        category: 'dp',
        description: '找出数组中乘积最大的连续子数组。',
        examples: [{ input: 'nums = [2,3,-2,4]', output: '6' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '负负得正', question: '为什么只要最大值不够？', answer: '因为最小值（负数）乘以负数会变成最大值。所以同时维护 max 和 min。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int maxProduct(int[] nums) {
        int max = nums[0], min = nums[0], res = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int mx = max, mn = min;
            max = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
            min = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
            res = Math.max(max, res);
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['同时维护最大最小'], template: ['"负数让最大变最小，最小变最大"'] },
        summary: '最大子数组和的进阶版。'
    },
    {
        id: 'partition-equal-subset-sum',
        title: '分割等和子集',
        difficulty: 'medium',
        category: 'dp',
        description: '判断是否可以将数组分割成两个元素和相等的子集。',
        examples: [{ input: 'nums = [1,5,11,5]', output: 'true' }],
        timeComplexity: 'O(n*sum)',
        timeExplanation: '',
        spaceComplexity: 'O(sum)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '01背包', question: '背包容量是？', answer: 'sum / 2。看能不能装满。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums) {
            for (int i = target; i >= num; i--) {
                dp[i] = dp[i] || dp[i - num];
            }
        }
        return dp[target];
    }
}`,
        interviewTips: { keyPoints: ['这是一个背包问题'], template: ['"能否凑出 sum/2"'] },
        summary: '01背包的直接应用。'
    },
    {
        id: 'longest-valid-parentheses',
        title: '最长有效括号',
        difficulty: 'hard',
        category: 'dp',
        description: '给你一个只包含 \'(\' 和 \')\' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。',
        examples: [{ input: 's = ")()())"', output: '4' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '状态', question: 'dp[i] 表示什么？', answer: '以 i 结尾的有效括号长度。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int longestValidParentheses(String s) {
        int max = 0;
        int[] dp = new int[s.length()];
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == ')') {
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
                }
                max = Math.max(max, dp[i]);
            }
        }
        return max;
    }
}`,
        interviewTips: { keyPoints: ['DP分类讨论'], template: ['"跟左边配对，再接上更左边的结果"'] },
        summary: '括号匹配的困难版。'
    }
];
