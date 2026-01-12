import { Problem } from '../types';

export const stackProblems: Problem[] = [
    {
        id: 'valid-parentheses',
        title: '有效的括号',
        difficulty: 'easy',
        category: 'stack',
        description: '给定一个只包括 \'(\'，\')\'，\'{\'，\'}\'，\'[\'，\']\' 的字符串 s ，判断字符串是否有效。',
        examples: [{ input: 's = "()[]{}"', output: 'true' }],
        timeComplexity: 'O(n)',
        timeExplanation: '一次遍历',
        spaceComplexity: 'O(n)',
        spaceExplanation: '栈空间',
        thinkingGuide: [{ title: '抵消', question: '遇到右括号？', answer: '看栈顶是不是匹配的左括号。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<Character>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
        interviewTips: { keyPoints: ['压入反向括号技巧'], template: ['"左扩入栈，右扩抵消"'] },
        summary: '栈的基础题。'
    },
    {
        id: 'min-stack',
        title: '最小栈',
        difficulty: 'easy',
        category: 'stack',
        description: '设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。',
        examples: [],
        timeComplexity: 'O(1)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '辅助栈', question: '怎么记住以前的最小值？', answer: '用另一个栈同步存当前的最小值。' }],
        codeImplementation: [],
        fullCode: `class MinStack {
    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();
    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
    }
    public void pop() {
        if (stack.pop().equals(minStack.peek())) minStack.pop();
    }
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`,
        interviewTips: { keyPoints: ['空间换时间'], template: ['"双栈同步"'] },
        summary: '设计题。'
    },
    {
        id: 'decode-string',
        title: '字符串解码',
        difficulty: 'medium',
        category: 'stack',
        description: '输入：s = "3[a]2[bc]"，输出："aaabcbc"。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '双栈', question: '遇到 [ 怎么办？', answer: '把当前的数字和字符串分别入栈，开始新的记录。' }, { title: '遇到 ]', question: '怎么办？', answer: '弹出一个数字和一段字符串，重复拼接。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public String decodeString(String s) {
        Stack<Integer> countStack = new Stack<>();
        Stack<StringBuilder> resStack = new Stack<>();
        StringBuilder res = new StringBuilder();
        int k = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                countStack.push(k);
                resStack.push(res);
                res = new StringBuilder();
                k = 0;
            } else if (c == ']') {
                StringBuilder temp = res;
                res = resStack.pop();
                for (int i = countStack.pop(); i > 0; i--) res.append(temp);
            } else {
                res.append(c);
            }
        }
        return res.toString();
    }
}`,
        interviewTips: { keyPoints: ['递归或者栈'], template: ['"由内向外层层剥洋葱"'] },
        summary: '经典的解析器题目。'
    },
    {
        id: 'daily-temperatures',
        title: '每日温度',
        difficulty: 'medium',
        category: 'stack',
        description: '给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。',
        examples: [{ input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '单调栈', question: '找右边第一个比我大的', answer: '维护一个单调递减栈。当前元素大于栈顶时，说明找到了栈顶元素的"下一个更大值"。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        Stack<Integer> stack = new Stack<>();
        int[] ret = new int[temperatures.length];
        for (int i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int idx = stack.pop();
                ret[idx] = i - idx;
            }
            stack.push(i);
        }
        return ret;
    }
}`,
        interviewTips: { keyPoints: ['单调递减栈'], template: ['"当前比栈顶大，说明我是栈顶的答案"'] },
        summary: '单调栈模板题。'
    },
    {
        id: 'largest-rectangle-in-histogram',
        title: '柱状图中最大的矩形',
        difficulty: 'hard',
        category: 'stack',
        description: '给定 n 个非负整数，用来表示柱状图中各个柱子的高度... 求最大矩形面积。',
        examples: [{ input: 'heights = [2,1,5,6,2,3]', output: '10' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '左右边界', question: '一个柱子能扩展多远？', answer: '向左找第一个比它矮的，向右找第一个比它矮的。宽 = 右 - 左 - 1。' }, { title: '单调栈', question: '怎么快速找？', answer: '单调递增栈。弹栈时计算面积。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        stack.push(-1); // 哨兵
        int maxArea = 0;
        for (int i = 0; i < heights.length; i++) {
            while (stack.peek() != -1 && heights[stack.peek()] >= heights[i]) {
                int height = heights[stack.pop()];
                int width = i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        while (stack.peek() != -1) {
            int height = heights[stack.pop()];
            int width = heights.length - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        return maxArea;
    }
}`,
        interviewTips: { keyPoints: ['前后加哨兵', '单调递增栈'], template: ['"弹栈由于遇到了更矮的，此时以栈顶为高的矩形确定了右边界"'] },
        summary: 'Hard题中的经典。'
    }
];
