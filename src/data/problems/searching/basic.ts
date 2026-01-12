import { Problem } from '../../types';

export const basicSearchingProblems: Problem[] = [
    {
        id: 'linear-search',
        title: '顺序查找',
        difficulty: 'easy',
        category: 'searching',
        description: '顺序查找是最简单直观的查找算法。它从数据结构的一端开始，依次查找，直到找到关键字，或者找不到为止。',
        examples: [{ input: 'nums = [1,3,5,7,9], target = 5', output: '2', explanation: '索引为2的元素是5' }],
        timeComplexity: 'O(n)',
        timeExplanation: '最坏情况遍历整个数组',
        spaceComplexity: 'O(1)',
        spaceExplanation: '不需要额外空间',
        thinkingGuide: [
            { title: '简单遍历', question: '最简单的找法是什么？', answer: '从头看到尾，一个一个比对。' }
        ],
        codeImplementation: [
            { title: '遍历比对', code: 'for(int i=0; i<n; i++) if(arr[i] == x) return i;', explanation: '找到即返回索引' }
        ],
        fullCode: `class Solution {
    public int linearSearch(int[] arr, int x) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == x) return i;
        }
        return -1;
    }
}`,
        interviewTips: { keyPoints: ['最基础查找', '数据无序时使用'], template: ['"顺序查找就是遍历"'] },
        summary: '顺序查找适用于无序小数据，简单但效率低。'
    },
    {
        id: 'binary-search',
        title: '二分查找',
        difficulty: 'easy',
        category: 'searching',
        description: '二分查找也称折半查找，它是一种效率较高的查找方法。但是，二分查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。',
        examples: [{ input: 'nums = [1,3,5,7,9], target = 9', output: '4' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '每次搜索范围缩小一半',
        spaceComplexity: 'O(1)',
        spaceExplanation: '迭代实现',
        thinkingGuide: [
            { title: '有序利用', question: '数组有序有什么好处？', answer: '比较中间数，如果目标比中间数大，就只用找右边。' }
        ],
        codeImplementation: [
            { title: '折半', code: 'int mid = left + (right - left) / 2;', explanation: '防止溢出的中间索引计算' }
        ],
        fullCode: `class Solution {
    public int binarySearch(int[] arr, int x) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == x)
                return m;
            if (arr[m] < x)
                l = m + 1;
            else
                r = m - 1;
        }
        return -1;
    }
}`,
        interviewTips: { keyPoints: ['必须有序', '边界条件容易出错', 'O(log n)'], template: ['"二分查找的核心是缩减搜索区间"'] },
        summary: '二分查找是面试中最经典的问题，必须熟练掌握迭代和递归写法。'
    },
    {
        id: 'interpolation-search',
        title: '插值查找',
        difficulty: 'medium',
        category: 'searching',
        description: '插值查找是二分查找的改进版。在二分查找中，mid总是取中间位置。而在插值查找中，mid是根据key在[low, high]中的比例位置来确定的，适合于分布均匀的数据。',
        examples: [{ input: 'nums = [0,10,20,30...100], target = 30', output: '3' }],
        timeComplexity: 'O(log log n)',
        timeExplanation: '数据均匀分布时极快，最坏O(n)',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地',
        thinkingGuide: [
            { title: '类比查字典', question: '查"apple"你会从中间翻每一页吗？', answer: '不会，你会估算它在前面的位置。插值查找就是这个估算的过程。' }
        ],
        codeImplementation: [
            { title: '位置估算', code: 'int pos = lo + (((hi - lo) / (arr[hi] - arr[lo])) * (x - arr[lo]));', explanation: '利用数值比例计算位置' }
        ],
        fullCode: `class Solution {
    public int interpolationSearch(int[] arr, int x) {
        int lo = 0, hi = (arr.length - 1);
        while (lo <= hi && x >= arr[lo] && x <= arr[hi]) {
            if (lo == hi) {
                if (arr[lo] == x) return lo;
                return -1;
            }
            // 估算位置
            int pos = lo + (((hi - lo) * (x - arr[lo])) / (arr[hi] - arr[lo]));
            
            if (arr[pos] == x) return pos;
            if (arr[pos] < x) lo = pos + 1;
            else hi = pos - 1;
        }
        return -1;
    }
}`,
        interviewTips: { keyPoints: ['基于数据均匀分布假设', '如果分布极端不均会退化为O(n)'], template: ['"插值查找是二分查找的自适应版本"'] },
        summary: '插值查找通过模拟查字典的行为，在数据分布均匀时比二分查找更高效。'
    },
    {
        id: 'fibonacci-search',
        title: '斐波那契查找',
        difficulty: 'medium',
        category: 'searching',
        description: '斐波那契查找利用斐波那契数列的性质来分割数组。它与二分查找类似，但分割点不再是中间，而是黄金分割点附近。它只进行加减运算，不涉及除法。',
        examples: [{ input: 'arr=[1,2,3,4,5], x=3', output: '2' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '与二分查找同阶',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地',
        thinkingGuide: [
            { title: '黄金分割', question: '为什么用斐波那契？', answer: 'Fib(k) ≈ Fib(k-1) + Fib(k-2)，恰好可以把数组分成两段，比例接近0.618。' }
        ],
        codeImplementation: [
            { title: '寻找分割点', code: 'int i = min(offset + fibMMm2, n-1);', explanation: '利用Fib数确定比较位置' }
        ],
        fullCode: `class Solution {
    public int fibonacciSearch(int[] arr, int x) {
        int n = arr.length;
        int fibMMm2 = 0; // (m-2)'th Fibonacci No.
        int fibMMm1 = 1; // (m-1)'th Fibonacci No.
        int fibM = fibMMm2 + fibMMm1; // m'th Fibonacci
        
        while (fibM < n) {
            fibMMm2 = fibMMm1;
            fibMMm1 = fibM;
            fibM = fibMMm2 + fibMMm1;
        }
        
        int offset = -1;
        while (fibM > 1) {
            int i = Math.min(offset + fibMMm2, n - 1);
            if (arr[i] < x) {
                fibM = fibMMm1;
                fibMMm1 = fibMMm2;
                fibMMm2 = fibM - fibMMm1;
                offset = i;
            } else if (arr[i] > x) {
                fibM = fibMMm2;
                fibMMm1 = fibMMm1 - fibMMm2;
                fibMMm2 = fibM - fibMMm1;
            } else return i;
        }
        if (fibMMm1 == 1 && arr[offset + 1] == x) return offset + 1;
        return -1;
    }
}`,
        interviewTips: { keyPoints: ['避免了除法运算', '对CPU友好（早期）', '查找区间按照Fib数列收缩'], template: ['"这是利用黄金分割原理的二分查找变体"'] },
        summary: '斐波那契查找在某些特定硬件架构下（除法慢）比二分查找更优。'
    }
];
