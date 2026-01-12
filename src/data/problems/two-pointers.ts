import { Problem } from '../types';

export const twoPointersProblems: Problem[] = [
    {
        id: 'move-zeroes',
        title: '移动零',
        difficulty: 'easy',
        category: 'two-pointers',
        description: '给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。',
        examples: [{ input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '一次遍历',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地修改',
        thinkingGuide: [
            { title: '快慢指针', question: '类似于什么？', answer: '类似于移除元素。slow 指向非0应该放置的位置。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                int temp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = temp;
                slow++;
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['不复制数组'], template: ['"滚雪球法：记录0的个数（或者快慢指针）"'] },
        summary: '数组操作基础。'
    },
    {
        id: 'container-with-most-water',
        title: '盛最多水的容器',
        difficulty: 'medium',
        category: 'two-pointers',
        description: '给定一个长度为 n 的整数数组 height 。找出两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。',
        examples: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '贪心', question: '移动哪边？', answer: '移动短板。因为移动长板面积一定变小（宽度变小，高度受限于短板），只有移动短板才有可能变大。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int max = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            max = Math.max(max, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max;
    }
}`,
        interviewTips: { keyPoints: ['短板效应'], template: ['"谁矮移谁"'] },
        summary: '双指针经典题。'
    },
    {
        id: '3sum',
        title: '三数之和',
        difficulty: 'medium',
        category: 'two-pointers',
        description: '给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。',
        examples: [{ input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' }],
        timeComplexity: 'O(n²)',
        timeExplanation: '排序O(nlogn) + 双指针O(n²)',
        spaceComplexity: 'O(log n)',
        spaceExplanation: '排序空间',
        thinkingGuide: [
            { title: '排序', question: '为什么先排序？', answer: '方便去重和使用双指针。' },
            { title: '降维', question: '怎么把三数变两数？', answer: '固定 nums[i]，如果不重复，在后面找 twoSum = -nums[i]。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['去重的细节'], template: ['"固定一个，移动两头"'] },
        summary: '面试中极其高频的题目。'
    },
    {
        id: 'trapping-rain-water',
        title: '接雨水',
        difficulty: 'hard',
        category: 'two-pointers',
        description: '给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。',
        examples: [{ input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '双指针',
        thinkingGuide: [
            { title: '按列求', question: '每一列能装多少水？', answer: '取决于 min(左边最高, 右边最高) - 当前高度。' },
            { title: '双指针', question: '怎么优化？', answer: '维护 l_max 和 r_max。如果 l_max < r_max，那左边的瓶颈就是 l_max，可以算出左边的水。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int ans = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else ans += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else ans += rightMax - height[right];
                right--;
            }
        }
        return ans;
    }
}`,
        interviewTips: { keyPoints: ['单调栈解法', '双指针解法'], template: ['"木桶原理，左右夹逼"'] },
        summary: '接雨水问题的最优解。'
    }
];
