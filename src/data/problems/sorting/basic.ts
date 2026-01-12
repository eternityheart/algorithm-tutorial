import { Problem } from '../../types';

export const basicSortingProblems: Problem[] = [
    {
        id: 'bubble-sort',
        title: '冒泡排序',
        difficulty: 'easy',
        category: 'sorting',
        description: '冒泡排序是一种简单的排序算法。它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。遍历数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。',
        examples: [
            { input: 'nums = [5,1,4,2,8]', output: '[1,2,4,5,8]', explanation: '最大的数像气泡一样浮到最后' }
        ],
        timeComplexity: 'O(n²)',
        timeExplanation: '嵌套循环，最坏情况需要比较 n*(n-1)/2 次',
        spaceComplexity: 'O(1)',
        spaceExplanation: '只需要常数个辅助变量',
        thinkingGuide: [
            { title: '直观理解', question: '为什么叫冒泡排序？', hint: '想象鱼缸里的气泡', answer: '每一轮遍历，最大的元素会像气泡一样"浮"到数组的顶端（末尾）。' },
            { title: '核心逻辑', question: '如何把最大的数移到最后？', hint: '比较相邻元素', answer: '从头到尾比较相邻两个元素，如果前一个比后一个大，就交换它们。' },
            { title: '优化思考', question: '如果数组已经有序了，怎么提前结束？', hint: '标记变量', answer: '引入一个swapped标记，如果一轮遍历中没有发生任何交换，说明数组已经有序，可以直接退出。' }
        ],
        codeImplementation: [
            { title: '外层循环', code: 'for (int i = 0; i < n - 1; i++) {', explanation: '控制遍历轮数，每轮将一个最大值归位' },
            { title: '内层比较与交换', code: '    for (int j = 0; j < n - 1 - i; j++) {\n        if (arr[j] > arr[j + 1]) {\n            swap(arr, j, j + 1);\n        }\n    }', explanation: '比较相邻元素，大的往后移。注意范围是 n-1-i' }
        ],
        fullCode: `class Solution {
    public void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            // 每一轮将最大的元素冒泡到最后
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // 如果没有发生交换，说明已有序
            if (!swapped) break;
        }
    }
}`,
        interviewTips: { keyPoints: ['稳定排序', '时间复杂度O(n²)', '适合教学'], template: ['"冒泡排序的核心是相邻比较和交换"', '"每一轮确定一个最大值"'] },
        summary: '冒泡排序是最基础的交换排序，虽然效率低，但其"相邻交换"的思想是理解排序算法的基石。'
    },
    {
        id: 'selection-sort',
        title: '选择排序',
        difficulty: 'easy',
        category: 'sorting',
        description: '选择排序的工作原理是：第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。',
        examples: [
            { input: 'nums = [5,1,4,2,8]', output: '[1,2,4,5,8]' }
        ],
        timeComplexity: 'O(n²)',
        timeExplanation: '无论数组是否有序，都需要进行 n*(n-1)/2 次比较',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地排序',
        thinkingGuide: [
            { title: '策略分析', question: '如何找到最小的元素？', answer: '遍历未排序部分，记录最小元素的索引。' },
            { title: '交换逻辑', question: '找到最小元素后怎么做？', answer: '将其与未排序部分的第一个元素交换。' }
        ],
        codeImplementation: [
            { title: '选择最小', code: 'int minIdx = i;\nfor(int j = i+1; j < n; j++) {\n    if(arr[j] < arr[minIdx]) minIdx = j;\n}', explanation: '在未排序区寻找最小值的索引' }
        ],
        fullCode: `class Solution {
    public void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            // 寻找[i, n-1]区间内的最小值索引
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // 将找到的最小值交换到位置i
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
        interviewTips: { keyPoints: ['不稳定排序', '交换次数少', '时间复杂度恒定O(n²)'], template: ['"选择排序的核心是每轮选出最小值"'] },
        summary: '选择排序每一轮选出最小值放到前面，虽然比较次数多，但交换次数最少（N次）。'
    },
    {
        id: 'insertion-sort',
        title: '插入排序',
        difficulty: 'easy',
        category: 'sorting',
        description: '插入排序的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
        examples: [{ input: 'nums = [5,1,4,2,8]', output: '[1,2,4,5,8]' }],
        timeComplexity: 'O(n²)',
        timeExplanation: '从最好O(n)到最坏O(n²)',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地排序',
        thinkingGuide: [
            { title: '类比思考', question: '如何整理手中的扑克牌？', answer: '摸一张牌，从后往前看，插到合适的位置。' }
        ],
        codeImplementation: [
            { title: '移位插入', code: 'while (j >= 0 && arr[j] > key) {\n    arr[j + 1] = arr[j];\n    j--;\n}', explanation: '比key大的元素后移，腾出位置' }
        ],
        fullCode: `class Solution {
    public void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;

            // 将大于key的元素向后移动
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`,
        interviewTips: { keyPoints: ['稳定排序', '对小数组高效', 'O(n)最佳情况'], template: ['"插入排序像抓扑克牌一样"'] },
        summary: '插入排序在数据基本有序时非常高效，常用于高级排序算法的底层优化（如TimSort）。'
    },
    {
        id: 'shell-sort',
        title: '希尔排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '希尔排序是插入排序的一种更高效的改进版本。它通过将比较的全部元素分为几个区域来提升插入排序的性能。这样可以让一个元素可以一次性地朝最终位置前进一大步。',
        examples: [{ input: 'nums = [8,9,1,7,2,3,5]', output: '[1,2,3,5,7,8,9]' }],
        timeComplexity: 'O(n log n)',
        timeExplanation: '依赖于增量序列，平均优于O(n²)',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地排序',
        thinkingGuide: [
            { title: '改进思路', question: '插入排序慢在哪里？', answer: '一次只能移动一位。' },
            { title: '增量分组', question: '如何让元素跳跃式移动？', answer: '按增量gap分组进行插入排序，逐步缩小gap。' }
        ],
        codeImplementation: [
            { title: '增量循环', code: 'for (int gap = n/2; gap > 0; gap /= 2)', explanation: '逐步缩小增量 gap' },
            { title: '分组插入', code: 'for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)', explanation: '对间隔为 gap 的元素进行插入排序' }
        ],
        fullCode: `class Solution {
    public void shellSort(int[] arr) {
        int n = arr.length;
        // 初始增量为n/2，每次折半
        for (int gap = n / 2; gap > 0; gap /= 2) {
            // 对每个组进行插入排序
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['不稳定排序', '第一个突破O(n²)的排序', '常用h=h*3+1序列'], template: ['"希尔排序是带间隔的插入排序"'] },
        summary: '希尔排序通过预排序让数组基本有序，再进行最后一次插入排序，大幅提高了效率。'
    }
];
