import { Problem } from '../types';

export const slidingWindowProblems: Problem[] = [
    {
        id: 'longest-substring-without-repeating-characters',
        title: '无重复字符的最长子串',
        difficulty: 'medium',
        category: 'sliding-window',
        description: '给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。',
        examples: [{ input: 's = "abcabcbb"', output: '3', explanation: '最长子串是 "abc"' }],
        timeComplexity: 'O(n)',
        timeExplanation: '左右指针各遍历一次',
        spaceComplexity: 'O(1)',
        spaceExplanation: '字符集大小固定(128)',
        thinkingGuide: [
            { title: '滑动窗口思想', question: '如果窗口内有重复字符怎么办？', answer: '一旦遇到重复字符，左边窗口就要收缩（左指针右移），直到把那个重复的字符移出去为止。' },
            { title: '快速定位', question: '如何快速知道字符上次出现的位置？', answer: '用哈希表记录每个字符上一次出现的索引。' }
        ],
        codeImplementation: [
            { title: '窗口维护', code: 'map.put(s.charAt(i), i);', explanation: '记录字符最新位置' },
            { title: '左边界跳跃', code: 'left = Math.max(left, map.get(c) + 1);', explanation: '如果发现重复，left直接跳到重复字符的下一位！' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s.length() == 0) return 0;
        
        //map记录字符上一次出现的索引
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0;
        int left = 0;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            // 如果窗口内出现了重复字符
            if (map.containsKey(c)) {
                // left更新为重复字符的下一位（注意不能倒退，取max）
                left = Math.max(left, map.get(c) + 1);
            }
            
            map.put(c, i); // 更新字符位置
            maxLen = Math.max(maxLen, i - left + 1);
        }
        
        return maxLen;
    }
}`,
        interviewTips: { keyPoints: ['滑动窗口模板题', 'left指针不回退', 'Map优化查找'], template: ['"维护一个不含重复字符的窗口"', '"遇到重复字符，左边界收缩"'] },
        summary: '最经典的滑动窗口题目，掌握它可以解决一系列"最长/最短连续子串"问题。'
    },
    {
        id: 'find-all-anagrams-in-a-string',
        title: '找到字符串中所有字母异位词',
        difficulty: 'medium',
        category: 'sliding-window',
        description: '给定两个字符串 s 和 p，找到 s 中所有是 p 的 字母异位词 的子串，返回这些子串的起始索引。',
        examples: [{ input: 's = "cbaebabacd", p = "abc"', output: '[0,6]', explanation: '"cba" 和 "bac" 是 "abc" 的异位词' }],
        timeComplexity: 'O(n)',
        timeExplanation: '一次遍历，比较开销是常数(26)',
        spaceComplexity: 'O(1)',
        spaceExplanation: '只需两个长26的数组',
        thinkingGuide: [
            { title: '固定窗口', question: '异位词的长度是多少？', answer: '异位词长度肯定等于p的长度。所以我们需要一个固定长度为 p.length() 的窗口。' },
            { title: '比较策略', question: '如何判断窗口内是异位词？', answer: '统计窗口内字符频率，与p的字符频率比较。用数组[26]最快。' }
        ],
        codeImplementation: [
            { title: '入窗出窗', code: 'sCount[s.charAt(i) - \'a\']++;\nsCount[s.charAt(i - len) - \'a\']--;', explanation: '右边进一个，左边出一个，维持窗口大小' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int sLen = s.length(), pLen = p.length();
        List<Integer> ans = new ArrayList<>();
        
        if (sLen < pLen) return ans;
        
        int[] sCount = new int[26];
        int[] pCount = new int[26];
        
        // 统计p的频率
        for (char c : p.toCharArray()) pCount[c - 'a']++;
        
        // 初始化第一个窗口
        for (int i = 0; i < pLen; i++) sCount[s.charAt(i) - 'a']++;
        
        if (Arrays.equals(sCount, pCount)) ans.add(0);
        
        // 滑动窗口
        for (int i = pLen; i < sLen; i++) {
            // 右边进
            sCount[s.charAt(i) - 'a']++;
            // 左边出
            sCount[s.charAt(i - pLen) - 'a']--;
            
            // 比较
            if (Arrays.equals(sCount, pCount)) {
                ans.add(i - pLen + 1);
            }
        }
        
        return ans;
    }
}`,
        interviewTips: { keyPoints: ['固定长度滑动窗口', '数组代替哈希表优化', 'Arrays.equals比较'], template: ['"维护一个定长窗口，比对字符计数数组"'] },
        summary: '固定长度的滑动窗口问题，核心是"一进一出"更新状态，避免重复计算。'
    }
];
