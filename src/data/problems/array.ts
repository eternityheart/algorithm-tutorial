import { Problem } from '../types';

export const arrayProblems: Problem[] = [
    {
        id: 'maximum-subarray',
        title: '最大子数组和',
        difficulty: 'medium',
        category: 'array',
        description: '给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。',
        examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: 'Kadane算法', question: '如果前面的和是负数，要不要？', answer: '不要。如果 preSum < 0，直接丢弃，从当前数字重新开始。' }
        ],
        codeImplementation: [
            { title: '状态转移', code: 'pre = Math.max(pre + x, x);', explanation: '要么接上前人，要么另起炉灶' }
        ],
        fullCode: `class Solution {
    public int maxSubArray(int[] nums) {
        int pre = 0, maxAns = nums[0];
        for (int x : nums) {
            pre = Math.max(pre + x, x);
            maxAns = Math.max(maxAns, pre);
        }
        return maxAns;
    }
}`,
        interviewTips: { keyPoints: ['贪心思想', 'DP思想'], template: ['"遇到负收益就止损，重新开始"'] },
        summary: '经典的Kadane算法。'
    },
    {
        id: 'merge-intervals',
        title: '合并区间',
        difficulty: 'medium',
        category: 'array',
        description: '以数组 intervals 表示若干个区间的集合... 返回 一个不重叠的区间数组',
        examples: [{ input: '[[1,3],[2,6],...]', output: '[[1,6],...]' }],
        timeComplexity: 'O(n log n)',
        timeExplanation: '排序',
        spaceComplexity: 'O(log n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '排序', question: '怎么好合并？', answer: '先按左端点排序。' },
            { title: '合并', question: '什么时候合并？', answer: '如果不重叠（next.start > curr.end），就添加新的；如果重叠，扩展当前区间的end。' }
        ],
        codeImplementation: [],
        fullCode: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][2];
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            int L = interval[0], R = interval[1];
            if (merged.size() == 0 || merged.get(merged.size() - 1)[1] < L) {
                merged.add(new int[]{L, R});
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], R);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
        interviewTips: { keyPoints: ['必须先排序'], template: ['"排序后，只看右边界"'] },
        summary: '区间合并的基础。'
    },
    {
        id: 'rotate-array',
        title: '轮转数组',
        difficulty: 'medium',
        category: 'array',
        description: '给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置。',
        examples: [{ input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '三次翻转', question: '不需额外空间怎么做？', answer: '1. 翻转整体 2. 翻转前半部分 3. 翻转后半部分。' }
        ],
        codeImplementation: [
            { title: '翻转', code: 'reverse(nums, 0, n-1); reverse(nums, 0, k-1); reverse(nums, k, n-1);', explanation: '神奇的数学性质' }
        ],
        fullCode: `class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    public void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}`,
        interviewTips: { keyPoints: ['翻转技巧'], template: ['"整体翻，分段翻"'] },
        summary: '经典的数组操作技巧。'
    },
    {
        id: 'product-of-array-except-self',
        title: '除自身以外数组的乘积',
        difficulty: 'medium',
        category: 'array',
        description: '给你一个整数数组 nums，返回数组 answer，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。',
        examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '左右乘积', question: 'answer[i] 等于什么？', answer: '左边的乘积 * 右边的乘积。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] answer = new int[length];
        
        // 算出每个数左边的乘积
        answer[0] = 1;
        for (int i = 1; i < length; i++) {
            answer[i] = nums[i - 1] * answer[i - 1];
        }
        
        // 再乘上右边的乘积
        int R = 1;
        for (int i = length - 1; i >= 0; i--) {
            answer[i] = answer[i] * R;
            R *= nums[i];
        }
        
        return answer;
    }
}`,
        interviewTips: { keyPoints: ['前缀后缀思想'], template: ['"左扫一遍存起来，右扫一遍乘上去"'] },
        summary: '避免使用除法的经典限制题。'
    },
    {
        id: 'first-missing-positive',
        title: '缺失的第一个正数',
        difficulty: 'hard',
        category: 'array',
        description: '给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。',
        examples: [{ input: 'nums = [1,2,0]', output: '3' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '原地哈希', question: '理想情况下 3 应该在哪个位置？', answer: '应该在下标 2 (即 value - 1)。' },
            { title: '归位', question: '如果数字不在它该在的位置怎么办？', answer: '把它换到它该去的地方，直到不能换为止。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                // 交换
                int temp = nums[nums[i] - 1];
                nums[nums[i] - 1] = nums[i];
                nums[i] = temp;
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
}`,
        interviewTips: { keyPoints: ['原地哈希'], template: ['"把萝卜填到对应的坑里"'] },
        summary: 'Hard题中的经典，考察对索引的巧妙利用。'
    }
];
