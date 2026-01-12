import { Problem } from '../types';

export const substringProblems: Problem[] = [
    {
        id: 'subarray-sum-equals-k',
        title: '和为 K 的子数组',
        difficulty: 'medium',
        category: 'substring',
        description: '给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。',
        examples: [{ input: 'nums = [1,1,1], k = 2', output: '2', explanation: '[1,1] 和 [1,1]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '一次遍历',
        spaceComplexity: 'O(n)',
        spaceExplanation: '哈希表存储前缀和',
        thinkingGuide: [
            { title: '前缀和', question: '如何快速求子数组 sums[i..j] 的和？', answer: '用前缀和 P[x]。sums[i..j] = P[j] - P[i-1]。' },
            { title: '转化', question: '题目变成了找什么？', answer: '找有多少对 (i, j) 满足 P[j] - P[i-1] == k，即 P[i-1] == P[j] - k。' }
        ],
        codeImplementation: [
            { title: '哈希记录', code: 'map.put(pre, map.getOrDefault(pre, 0) + 1);', explanation: '记录前缀和出现的次数' }
        ],
        fullCode: `import java.util.HashMap;

class Solution {
    public int subarraySum(int[] nums, int k) {
        // map: 前缀和 -> 该前缀和出现的次数
        HashMap<Integer, Integer> map = new HashMap<>();
        // 初始化：前缀和为0出现1次（相当于什么都不选）
        map.put(0, 1);
        
        int count = 0;
        int pre = 0;
        for (int x : nums) {
            pre += x;
            // 查找是否存在 pre - k
            if (map.containsKey(pre - k)) {
                count += map.get(pre - k);
            }
            map.put(pre, map.getOrDefault(pre, 0) + 1);
        }
        return count;
    }
}`,
        interviewTips: { keyPoints: ['前缀和技巧', 'Two Sum变体'], template: ['"利用 P[j] - P[i] = k 转化为查找问题"'] },
        summary: '前缀和 + 哈希表是解决子数组求和问题的黄金搭档。'
    },
    {
        id: 'sliding-window-maximum',
        title: '滑动窗口最大值',
        difficulty: 'hard',
        category: 'substring',
        description: '给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。返回 滑动窗口中的最大值 。',
        examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '每个元素最多进出队列一次',
        spaceComplexity: 'O(k)',
        spaceExplanation: '双端队列',
        thinkingGuide: [
            { title: '单调队列', question: '如果窗口里有 5 和 3，5在3后面，那3还有用吗？', answer: '没用。因为5比3大且比3后出窗口，只要5在，3永远不可能是最大值。' }
        ],
        codeImplementation: [
            { title: '保持单调', code: 'while (!deque.isEmpty() && nums[i] > nums[deque.peekLast()]) deque.pollLast();', explanation: '移除队尾比当前小的元素' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if(nums == null || nums.length < 2) return nums;
        LinkedList<Integer> queue = new LinkedList();
        int[] result = new int[nums.length - k + 1];
        
        for(int i = 0;i < nums.length;i++){
            // 1. 保证从大到小 如果前面数小则需要依次弹出，直至满足要求
            while(!queue.isEmpty() && nums[queue.peekLast()] <= nums[i]){
                queue.pollLast();
            }
            // 2. 添加当前值对应的数组下标
            queue.addLast(i);
            
            // 3. 判断当前队列中队首的值是否有效
            if(queue.peek() <= i-k){
                queue.poll();   
            } 
            // 4. 当窗口长度为k时 保存当前窗口中最大值
            if(i + 1 >= k){
                result[i+1-k] = nums[queue.peek()];
            }
        }
        return result;
    }
}`,
        interviewTips: { keyPoints: ['单调队列', '存下标而不是值'], template: ['"维护一个递减队列，队头就是最大值"'] },
        summary: '单调队列是解决滑动窗口最值问题的标准解法。'
    },
    {
        id: 'minimum-window-substring',
        title: '最小覆盖子串',
        difficulty: 'hard',
        category: 'substring',
        description: '给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。',
        examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' }],
        timeComplexity: 'O(n)',
        timeExplanation: '左右指针各遍历一次',
        spaceComplexity: 'O(C)',
        spaceExplanation: '字符集大小',
        thinkingGuide: [
            { title: '验证覆盖', question: '怎么知道窗口涵盖了t？', answer: '用一个 `need` 计数器记录 t 中还缺多少个字符。' },
            { title: '收缩时机', question: '什么时候收缩左边界？', answer: '当窗口涵盖了 t 所有字符时，尝试右移左指针缩小窗口，看是否依然满足。' }
        ],
        codeImplementation: [
            { title: '更新结果', code: 'if (right - left + 1 < minLen) { start = left; minLen = ... }', explanation: '记录最小窗口' }
        ],
        fullCode: `class Solution {
    public String minWindow(String s, String t) {
        if (s == null || s.length() == 0 || t == null || t.length() == 0){
            return "";
        }
        int[] need = new int[128];
        for (int i = 0; i < t.length(); i++) {
            need[t.charAt(i)]++;
        }
        int l = 0, r = 0, size = Integer.MAX_VALUE, count = t.length(), start = 0;
        
        while (r < s.length()) {
            char c = s.charAt(r);
            if (need[c] > 0) {
                count--;
            }
            need[c]--;
            
            if (count == 0) {
                while (l < r && need[s.charAt(l)] < 0) {
                    need[s.charAt(l)]++;
                    l++;
                }
                if (r - l + 1 < size) {
                    size = r - l + 1;
                    start = l;
                }
                // 破坏满足条件，开始寻找下一个
                need[s.charAt(l)]++;
                l++;
                count++;
            }
            r++;
        }
        return size == Integer.MAX_VALUE ? "" : s.substring(start, start + size);
    }
}`,
        interviewTips: { keyPoints: ['滑动窗口模板', 'need数组技巧'], template: ['"右移扩大找可行解，左移收缩找最优解"'] },
        summary: '滑动窗口中最困难也最经典的一道题，逻辑严密，考察代码掌控力。'
    }
];
