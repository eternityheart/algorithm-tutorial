import { Problem } from '../types';

export const tricksProblems: Problem[] = [
    {
        id: 'single-number',
        title: '只出现一次的数字',
        difficulty: 'easy',
        category: 'tricks',
        description: '给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现一次的元素。',
        examples: [{ input: 'nums = [4,1,2,1,2]', output: '4' }],
        timeComplexity: 'O(n)',
        timeExplanation: '一次遍历',
        spaceComplexity: 'O(1)',
        spaceExplanation: '无需额外空间',
        thinkingGuide: [
            { title: '异或魔法', question: '相同的数异或等于什么？', answer: 'a ^ a = 0。' },
            { title: '结合律', question: '0 ^ a 等于什么？', answer: 'a。所以把所有数异或起来，成对的都消掉了，只剩唯一的那个。' }
        ],
        codeImplementation: [
            { title: '异或', code: 'ans ^= num;', explanation: '累积异或' }
        ],
        fullCode: `class Solution {
    public int singleNumber(int[] nums) {
        int single = 0;
        for (int num : nums) {
            single ^= num;
        }
        return single;
    }
}`,
        interviewTips: { keyPoints: ['异或性质', '位运算'], template: ['"异或：相同为0，不同为1"'] },
        summary: '位运算的入门题。'
    },
    {
        id: 'majority-element',
        title: '多数元素',
        difficulty: 'easy',
        category: 'tricks',
        description: '给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。',
        examples: [{ input: 'nums = [3,2,3]', output: '3' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '摩尔投票', question: '怎么在不占空间的情况下统计？', answer: '把众数看作 +1，非众数看作 -1。相互抵消，剩下的肯定是众数。' }
        ],
        codeImplementation: [
            { title: '抵消', code: 'if (count == 0) candidate = num;', explanation: '更换候选人' }
        ],
        fullCode: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        Integer candidate = null;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
        interviewTips: { keyPoints: ['摩尔投票法', '分治法也可以做'], template: ['"一换一抵消，最后剩下的就是王"'] },
        summary: '摩尔投票算法是解决此类问题的最优解。'
    },
    {
        id: 'sort-colors',
        title: '颜色分类',
        difficulty: 'medium',
        category: 'tricks',
        description: '给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。使用 0, 1, 2 分别表示红、白、蓝。',
        examples: [{ input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '荷兰国旗问题', question: '怎么只遍历一次？', answer: '用三个指针：p0(0的右边界), p2(2的左边界), curr。' }
        ],
        codeImplementation: [
            { title: '交换', code: 'if (nums[curr] == 0) swap(curr++, p0++); else if (nums[curr] == 2) swap(curr, p2--); else curr++;', explanation: '遇到0发配到左边，遇到2发配到右边' }
        ],
        fullCode: `class Solution {
    public void sortColors(int[] nums) {
        int p0 = 0, p2 = nums.length - 1, curr = 0;
        while (curr <= p2) {
            if (nums[curr] == 0) {
                int temp = nums[curr];
                nums[curr] = nums[p0];
                nums[p0] = temp;
                p0++;
                curr++;
            } else if (nums[curr] == 2) {
                int temp = nums[curr];
                nums[curr] = nums[p2];
                nums[p2] = temp;
                p2--;
                // 这里curr不需要++，因为交换回来的可能是0或1，需要再次判断
            } else {
                curr++;
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['三指针', '快排分区思想'], template: ['"0往前扔，2往后扔，1不管"'] },
        summary: '经典的荷兰国旗问题。'
    },
    {
        id: 'next-permutation',
        title: '下一个排列',
        difficulty: 'medium',
        category: 'tricks',
        description: '整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。',
        examples: [{ input: 'nums = [1,2,3]', output: '[1,3,2]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '找规律', question: '怎么变大一点点？', answer: '从后往前找第一个变小的数 a[i]，然后从后往前找第一个比它大的数 a[j]，交换。然后把 i 后面的倒序。' }
        ],
        codeImplementation: [
            { title: '交换反转', code: 'swap(nums, i, j); reverse(nums, i+1);', explanation: '从O(n)到O(n)' }
        ],
        fullCode: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = nums.length - 1;
            while (j >= 0 && nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }
        reverse(nums, i + 1);
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;
    }
    private void reverse(int[] nums, int start) {
        int end = nums.length - 1;
        while (start < end) swap(nums, start++, end--);
    }
}`,
        interviewTips: { keyPoints: ['背诵算法步骤', '分析字典序'], template: ['"找拐点，找大数，交换，翻转"'] },
        summary: '这道题属于"记住了就会，记不住就不会"的技巧题。'
    },
    {
        id: 'find-duplicate-number',
        title: '寻找重复数',
        difficulty: 'medium',
        category: 'tricks',
        description: '给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。',
        examples: [{ input: 'nums = [1,3,4,2,2]', output: '2' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '快慢指针',
        thinkingGuide: [
            { title: '转化', question: '这和链表有什么关系？', answer: '把数组看成链表：i -> nums[i]。重复的数就是链表的环入口。' }
        ],
        codeImplementation: [
            { title: 'Floyd判圈', code: 'slow = nums[slow]; fast = nums[nums[fast]];', explanation: '快慢指针找相遇点' }
        ],
        fullCode: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
        interviewTips: { keyPoints: ['为什么能看作链表？', '环的入口求法'], template: ['"抽象成带环链表，寻找环入口"'] },
        summary: '极具技巧性的题目，将数组问题转化为链表成环问题。'
    },
    {
        id: 'single-number-ii',
        title: '只出现一次的数字 II',
        difficulty: 'medium',
        category: 'tricks',
        description: '给定一个整数数组，除某个元素仅出现一次外，其余每个元素都恰出现 三次 。请你找出那个只出现了一次的元素。',
        examples: [{ input: 'nums = [2,2,3,2]', output: '3' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '状态机', question: '怎么用位运算处理出现3次的数？', answer: '使用两个变量 ones, twos 模拟三进制。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        for (int num : nums) {
            ones = (ones ^ num) & ~twos;
            twos = (twos ^ num) & ~ones;
        }
        return ones;
    }
}`,
        interviewTips: { keyPoints: ['状态机思想', '位运算'], template: ['"用 ones, twos 模拟三进制计数"'] },
        summary: '位运算的进阶题，需要理解状态机。'
    }
];
