import { Problem } from '../types';

export const binarySearchProblems: Problem[] = [
    {
        id: 'search-insert-position',
        title: '搜索插入位置',
        difficulty: 'easy',
        category: 'binary-search',
        description: '给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。',
        examples: [{ input: 'nums = [1,3,5,6], target = 5', output: '2' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '二分法', question: '找不到时返回什么？', answer: '返回 left。因为循环结束时 left 指向第一个大于 target 的位置。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
}`,
        interviewTips: { keyPoints: ['二分模板'], template: ['"经典的 lower_bound 实现"'] },
        summary: '二分查找最基础的应用。'
    },
    {
        id: 'search-a-2d-matrix',
        title: '搜索二维矩阵',
        difficulty: 'medium',
        category: 'binary-search',
        description: '给你一个满足下述规定的 m x n 整数矩阵：每行中的整数从左到右按升序排列。每行的第一个整数大于前一行的最后一个整数。判断矩阵中是否存在目标值 target 。',
        examples: [{ input: 'matrix = [[1,3,5,7],[10,11,16,20]...], target = 3', output: 'true' }],
        timeComplexity: 'O(log(mn))',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '虚拟数组', question: '能把它看作一维数组吗？', answer: '可以。坐标映射：index -> (index / n, index % n)。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`,
        interviewTips: { keyPoints: ['坐标映射'], template: ['"视为有序数组，直接二分"'] },
        summary: '二维降一维的技巧。'
    },
    {
        id: 'find-first-and-last-position',
        title: '在排序数组中查找元素的第一个和最后一个位置',
        difficulty: 'medium',
        category: 'binary-search',
        description: '给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。',
        examples: [{ input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '两次二分', question: '怎么找左边界和右边界？', answer: '找左边界：遇到 target 继续向左收缩 (right = mid - 1)。找右边界同理。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] res = new int[]{-1, -1};
        res[0] = findFirst(nums, target);
        if (res[0] == -1) return res;
        res[1] = findLast(nums, target);
        return res;
    }
    private int findFirst(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        int idx = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] >= target) {
                if (nums[mid] == target) idx = mid;
                right = mid - 1;
            } else left = mid + 1;
        }
        return idx;
    }
    private int findLast(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        int idx = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target) {
                if (nums[mid] == target) idx = mid;
                left = mid + 1;
            } else right = mid - 1;
        }
        return idx;
    }
}`,
        interviewTips: { keyPoints: ['二分查找的边界收缩'], template: ['"找到目标不停止，继续收缩找边界"'] },
        summary: '精细控制二分边界的必修课。'
    },
    {
        id: 'search-in-rotated-sorted-array',
        title: '搜索旋转排序数组',
        difficulty: 'medium',
        category: 'binary-search',
        description: '整数数组 nums 按升序排列，数组在预先未知的某个点上进行了旋转。请你在数组中搜索 target 。',
        examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '局部有序', question: '切一刀，有什么特点？', answer: '总有一半是有序的。' },
            { title: '判断', question: '如果在 nums[0] <= nums[mid] 说明什么？', answer: '说明左半边 [0, mid] 是有序的。然后看 target 是不是在里面。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            
            if (nums[0] <= nums[mid]) { // 左半边有序
                if (target >= nums[0] && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else { // 右半边有序
                if (target > nums[mid] && target <= nums[nums.length - 1]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`,
        interviewTips: { keyPoints: ['判断哪半边有序'], template: ['"先确定哪边有序，再判断target位置"'] },
        summary: '处理"部分有序"数组的经典策略。'
    },
    {
        id: 'find-minimum-in-rotated-sorted-array',
        title: '寻找旋转排序数组中的最小值',
        difficulty: 'medium',
        category: 'binary-search',
        description: '已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。请你找出并返回数组中的 最小元素 。',
        examples: [{ input: 'nums = [3,4,5,1,2]', output: '1' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '比谁', question: '和左边比还是和右边比？', answer: '和右边界 right 比。如果 nums[mid] < nums[right]，说明右边有序，最小值在左边（含mid）。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[right]) {
                // 右边有序，最小值在左边，可能是mid
                right = mid;
            } else {
                // 左边有序（且断崖在右边），最小值在右边，不可能是mid
                left = mid + 1;
            }
        }
        return nums[left];
    }
}`,
        interviewTips: { keyPoints: ['循环条件 left < right', '为什么 right = mid'], template: ['"和右边界比较，逐渐缩小范围"'] },
        summary: '二分查找变体，注意边界处理。'
    },
    {
        id: 'median-of-two-sorted-arrays',
        title: '寻找两个正序数组的中位数',
        difficulty: 'hard',
        category: 'binary-search',
        description: '给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。算法的时间复杂度应该为 O(log (m+n)) 。',
        examples: [{ input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' }],
        timeComplexity: 'O(log(min(m,n)))',
        timeExplanation: '二分查找较短数组',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '划分', question: '中位数意味着什么？', answer: '把两个数组分成左右两部分，两部分数量相等，且左边 max <= 右边 min。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        
        int m = nums1.length;
        int n = nums2.length;
        int totalLeft = (m + n + 1) / 2;
        
        int left = 0, right = m;
        while (left < right) {
            int i = left + (right - left + 1) / 2;
            int j = totalLeft - i;
            if (nums1[i - 1] > nums2[j]) {
                right = i - 1;
            } else {
                left = i;
            }
        }
        
        int i = left;
        int j = totalLeft - i;
        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums1RightMin = i == m ? Integer.MAX_VALUE : nums1[i];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums2RightMin = j == n ? Integer.MAX_VALUE : nums2[j];
        
        if ((m + n) % 2 == 1) {
            return Math.max(nums1LeftMax, nums2LeftMax);
        } else {
            return (Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin)) / 2.0;
        }
    }
}`,
        interviewTips: { keyPoints: ['分割线思想', '对较短数组二分'], template: ['"寻找一条分割线，使得左边数 <= 右边数"'] },
        summary: '二分查找的巅峰之作，极难。'
    }
];
