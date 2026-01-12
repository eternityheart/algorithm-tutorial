import { Problem } from '../types';

export const hashProblems: Problem[] = [
    {
        id: 'two-sum',
        title: '两数之和',
        difficulty: 'easy',
        category: 'hash',
        description: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案，并且你不能使用两次同一个元素。',
        examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: '因为 nums[0] + nums[1] == 9，返回 [0, 1]' },
            { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
        ],
        timeComplexity: 'O(n)',
        timeExplanation: '只需遍历一次数组',
        spaceComplexity: 'O(n)',
        spaceExplanation: '哈希表最多存n个元素',
        thinkingGuide: [
            { title: '理解问题本质', question: '这道题让我们找什么？', hint: '找两个数，它们加起来等于target', answer: '我们要在数组中找到两个数 a 和 b，使得 a + b = target。换句话说，对于每个数 a，我们要找的是 target - a。' },
            { title: '暴力解法的问题', question: '最直接的方法是什么？有什么问题？', hint: '两层循环遍历所有组合', answer: '暴力解法用两层for循环，时间O(n²)太慢。问题本质是：对于每个数，如何快速知道它的"配对数"是否存在？' },
            { title: '优化思路', question: '如何快速判断一个数是否在数组中出现过？', hint: '想想什么数据结构能O(1)时间查找', answer: '哈希表！我们可以边遍历边存储，对于当前数num，查找map中是否有target-num。' },
            { title: '哈希表设计', question: 'HashMap应该存什么？key和value分别是什么？', hint: '我们需要找到数的索引', answer: 'key存数值，value存索引。这样查找target-num时能直接获取索引。' },
            { title: '遍历策略', question: '是先存后查，还是先查后存？', hint: '考虑去重问题', answer: '先查后存！这样可以避免使用同一个元素两次。' }
        ],
        codeImplementation: [
            { title: '定义方法和哈希表', code: 'public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();', explanation: '返回类型是int[]（两个索引），HashMap的key是数值，value是对应的索引。' },
            { title: '遍历并计算key', code: '    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];', explanation: 'complement就是我们要找的"配对数"，如果target=9，当前num=2，则complement=7。' },
            { title: '加入对应分组', code: '        if (map.containsKey(complement)) {\n            return new int[]{map.get(complement), i};\n        }', explanation: '如果配对数已经在map中，说明找到答案了！返回配对数的索引和当前索引。' },
            { title: '返回结果', code: '        map.put(nums[i], i);\n    }\n    return new int[0];\n}', explanation: '如果没找到配对，就把当前数存入map，供后续数查找。' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // 哈希表：key是数值，value是索引
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            // 计算需要的配对数
            int complement = target - nums[i];
            
            // 先查：配对数是否已存在
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            // 后存：当前数入map
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
}`,
        interviewTips: {
            keyPoints: [
                '时间复杂度从O(n²)优化到O(n)的关键是哈希表',
                '先查后存避免使用同一元素两次',
                '可以讨论：如果有多组解怎么办？'
            ],
            template: [
                '"这道题的核心是用哈希表实现O(1)查找"',
                '"对于每个数，我们需要找target减去它的值"',
                '"先查后存可以避免重复使用同一元素"'
            ]
        },
        summary: '两数之和是哈希表的经典应用，核心思想是"边遍历边存储"，将O(n)的查找优化为O(1)。'
    },
    {
        id: 'group-anagrams',
        title: '字母异位词分组',
        difficulty: 'medium',
        category: 'hash',
        description: '给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。字母异位词是由重新排列源单词的所有字母得到的一个新单词。',
        examples: [
            { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: '"eat","tea","ate"是一组异位词，"tan","nat"是一组，"bat"单独一组' },
            { input: 'strs = [""]', output: '[[""]]' }
        ],
        timeComplexity: 'O(n × k × log k)',
        timeExplanation: 'n个字符串，每个长度k，排序需要k×log k',
        spaceComplexity: 'O(n × k)',
        spaceExplanation: '存储所有字符串',
        thinkingGuide: [
            { title: '理解问题本质', question: '什么是字母异位词？如何判断两个词是异位词？', hint: '排序后相同', answer: '字母异位词就是字母相同但顺序不同的词，如"eat"和"tea"。排序后都变成"aet"，这就是我们分组的依据！' },
            { title: '分组的key', question: '如何设计HashMap的key？', hint: '需要一个能唯一标识一组异位词的值', answer: '用排序后的字符串作为key！所有异位词排序后都相同，自然就分到同一组了。' },
            { title: 'HashMap的value', question: 'value应该存什么类型？', hint: '每个key对应多个词', answer: 'List<String>，存储所有属于这一组的原始字符串。' }
        ],
        codeImplementation: [
            { title: '定义方法和哈希表', code: 'public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> map = new HashMap<>();', explanation: 'key是排序后的字符串，value是该组的所有原始词' },
            { title: '遍历并计算key', code: '    for (String str : strs) {\n        char[] chars = str.toCharArray();\n        Arrays.sort(chars);\n        String key = new String(chars);', explanation: '将字符串转为字符数组排序，得到统一的key' },
            { title: '加入对应分组', code: '        List<String> list = map.getOrDefault(key, new ArrayList<>());\n        list.add(str);\n        map.put(key, list);\n    }', explanation: 'getOrDefault简化了判空逻辑' },
            { title: '返回结果', code: '    return new ArrayList<>(map.values());\n}', explanation: 'map.values()返回所有分组' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // 哈希表：key是排序后字符串，value是原字符串列表
        Map<String, List<String>> map = new HashMap<>();
        
        for (String str : strs) {
            // 排序得到key
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            
            // 加入对应分组
            List<String> list = map.getOrDefault(key, new ArrayList<>());
            list.add(str);
            map.put(key, list);
        }
        
        // 返回所有分组
        return new ArrayList<>(map.values());
    }
}`,
        interviewTips: {
            keyPoints: [
                '可以提出另一种key的计算方式：统计每个字母出现次数，如"a1e1t1"',
                '讨论两种方法的优劣：排序简单但慢，计数复杂但对长字符串更快'
            ],
            template: [
                '"字母异位词分组的核心是找到"标识"，排序后的字符串是最直观的标识"',
                '"时间复杂度是O(n × k log k)，还可以优化的地方是..."'
            ]
        },
        summary: '字母异位词分组的核心是找到"标识"。排序后的字符串是最直观的标识，让异位词映射到同一个key。这是哈希表"分组"功能的典型应用。'
    },
    {
        id: 'longest-consecutive',
        title: '最长连续序列',
        difficulty: 'medium',
        category: 'hash',
        description: '给定一个未排序的整数数组 nums，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。请你设计并实现时间复杂度为 O(n) 的算法解决此问题。',
        examples: [
            { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: '最长连续序列是 [1, 2, 3, 4]，长度为 4' },
            { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
        ],
        timeComplexity: 'O(n)',
        timeExplanation: '虽然有嵌套循环，但每个数最多被访问两次',
        spaceComplexity: 'O(n)',
        spaceExplanation: 'HashSet存储所有元素',
        thinkingGuide: [
            { title: '理解问题', question: '为什么不能直接排序？', hint: '题目要求O(n)', answer: '排序需要O(n log n)，不满足要求。我们需要用空间换时间。' },
            { title: '核心思路', question: '如何快速判断一个数的前后数字是否存在？', hint: 'HashSet', answer: '用HashSet存储所有数，可以O(1)判断num-1或num+1是否存在。' },
            { title: '避免重复计算', question: '如何确保每个序列只被计算一次？', hint: '从序列的起点开始', answer: '只从序列的起点（num-1不存在）开始计数，这样每个序列只会被遍历一次！' }
        ],
        codeImplementation: [
            { title: '构建HashSet', code: 'public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int num : nums) set.add(num);', explanation: 'HashSet去重并支持O(1)查找' },
            { title: '遍历找起点', code: '    int maxLen = 0;\n    for (int num : set) {\n        if (!set.contains(num - 1)) {', explanation: '关键：只从序列起点开始，避免重复计算' },
            { title: '向后延伸计数', code: '            int currentNum = num;\n            int len = 1;\n            while (set.contains(currentNum + 1)) {\n                currentNum++;\n                len++;\n            }', explanation: '从起点向后找连续的数' },
            { title: '更新最大值', code: '            maxLen = Math.max(maxLen, len);\n        }\n    }\n    return maxLen;\n}', explanation: '比较更新最长序列' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        // HashSet去重并支持O(1)查找
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }
        
        int maxLen = 0;
        
        for (int num : set) {
            // 只从序列起点开始（num-1不存在）
            if (!set.contains(num - 1)) {
                int currentNum = num;
                int len = 1;
                
                // 向后延伸
                while (set.contains(currentNum + 1)) {
                    currentNum++;
                    len++;
                }
                
                maxLen = Math.max(maxLen, len);
            }
        }
        
        return maxLen;
    }
}`,
        interviewTips: {
            keyPoints: [
                '关键优化：只从序列起点开始计数',
                '虽然有嵌套循环，但每个元素最多被访问两次，所以是O(n)',
                '可以用并查集解决，但哈希表更简洁'
            ],
            template: [
                '"这道题的关键是用HashSet实现O(1)查找"',
                '"为了避免重复计算，我只从序列的起点开始"',
                '"时间复杂度是O(n)，因为每个数最多被访问两次"'
            ]
        },
        summary: '最长连续序列的核心是用HashSet实现O(1)查找，并通过"只从起点计数"避免重复遍历。'
    }
];
