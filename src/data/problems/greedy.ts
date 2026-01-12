import { Problem } from '../types';

export const greedyProblems: Problem[] = [
    {
        id: 'best-time-to-buy-and-sell-stock',
        title: '买卖股票的最佳时机',
        difficulty: 'easy',
        category: 'greedy',
        description: '给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。',
        examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '贪心', question: '怎么最赚？', answer: '在最低点买，最高点卖。维护一个 minPrice 和 maxProfit。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
        interviewTips: { keyPoints: ['维护历史最小值'], template: ['"低买高卖"'] },
        summary: '最简单的动态规划/贪心。'
    },
    {
        id: 'jump-game',
        title: '跳跃游戏',
        difficulty: 'medium',
        category: 'greedy',
        description: '判定是否能够到达最后一个下标。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '覆盖范围', question: '关注点', answer: '不是具体的跳法，而是能覆盖到的最大范围。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean canJump(int[] nums) {
        int far = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > far) return false;
            far = Math.max(far, i + nums[i]);
        }
        return true;
    }
}`,
        interviewTips: { keyPoints: ['维护最远距离'], template: ['"只要i在far以内，我就能跳到i+nums[i]"'] },
        summary: '贪心思想入门。'
    },
    {
        id: 'jump-game-ii',
        title: '跳跃游戏 II',
        difficulty: 'medium',
        category: 'greedy',
        description: '返回到达 nums[n - 1] 的最小跳跃次数。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '边界更新', question: '什么时候步数+1？', answer: '当我们走到当前步数能到达的最远边界 end 时，必须再跳一步，步数+1，并更新新的边界。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int jump(int[] nums) {
        int end = 0, maxPos = 0, steps = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            maxPos = Math.max(maxPos, i + nums[i]);
            if (i == end) {
                end = maxPos;
                steps++;
            }
        }
        return steps;
    }
}`,
        interviewTips: { keyPoints: ['隐式BFS'], template: ['"走到边界不得不跳"'] },
        summary: '比上一题多一个转折。'
    },
    {
        id: 'partition-labels',
        title: '划分字母区间',
        difficulty: 'medium',
        category: 'greedy',
        description: '字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。',
        examples: [{ input: 'S = "ababcbacadefegdehijhklij"', output: '[9,7,8]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '最远位置', question: '什么时候必须切？', answer: '当遍历到目前所有字符的最远出现位置时，就可以切一刀。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
        List<Integer> res = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                res.add(end - start + 1);
                start = end + 1;
            }
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['预处理'], template: ['"先记录每个字符最后出现的位置"'] },
        summary: '通过预处理辅助贪心。'
    }
];
