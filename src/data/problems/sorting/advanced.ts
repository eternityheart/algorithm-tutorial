import { Problem } from '../../types';

export const advancedSortingProblems: Problem[] = [
    {
        id: 'quick-sort',
        title: '快速排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '快速排序使用分治法策略来把一个序列分为两个子序列。步骤为：1. 从数列中挑出一个元素，称为"基准"（pivot）；2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。',
        examples: [{ input: 'nums = [5,1,4,2,8]', output: '[1,2,4,5,8]' }],
        timeComplexity: 'O(n log n)',
        timeExplanation: '平均情况高效，最坏O(n²)',
        spaceComplexity: 'O(log n)',
        spaceExplanation: '递归调用栈深度',
        thinkingGuide: [
            { title: '分治思想', question: '如何把大问题变小？', answer: '选一个基准，把比它小的放左边，比它大的放右边。' },
            { title: '递归', question: '左右两边怎么办？', answer: '对左右两边分别重复上述过程，直到每个部分只有一个元素。' }
        ],
        codeImplementation: [
            { title: '基准分区', code: 'int pivot = arr[high];\nint i = (low - 1);\nfor (int j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n        i++;\n        swap(arr, i, j);\n    }\n}\nswap(arr, i + 1, high);', explanation: 'Lomuto分区方案：维护小于pivot的区域' }
        ],
        fullCode: `class Solution {
    public void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // π is partitioning index, arr[pi] is now at right place
            int pi = partition(arr, low, high);

            // Recursively sort elements before and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1); // index of smaller element
        for (int j = low; j < high; j++) {
            // If current element is smaller than the pivot
            if (arr[j] < pivot) {
                i++;
                // swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // swap arr[i+1] and arr[high] (or pivot)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }
}`,
        interviewTips: { keyPoints: ['最常用的排序', '注意最坏情况优化（随机基准）', '不稳定排序'], template: ['"快排的核心是分区（Partition）"'] },
        summary: '快速排序是实际应用中最常用的排序算法，其核心在于分区的效率。'
    },
    {
        id: 'merge-sort',
        title: '归并排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列。',
        examples: [{ input: 'nums = [5,1,4,2,8]', output: '[1,2,4,5,8]' }],
        timeComplexity: 'O(n log n)',
        timeExplanation: '严格的O(n log n)，不受数据影响',
        spaceComplexity: 'O(n)',
        spaceExplanation: '需要辅助数组',
        thinkingGuide: [
            { title: '拆分', question: '一直拆分会发生什么？', answer: '拆到只剩一个元素时，它就是有序的。' },
            { title: '合并', question: '有两个有序数组，怎么合并成一个？', answer: '双指针比较，谁小取谁，放入新数组。' }
        ],
        codeImplementation: [
            { title: '合并逻辑', code: 'while (i < n1 && j < n2) {\n    if (L[i] <= R[j]) arr[k] = L[i++];\n    else arr[k] = R[j++];\n    k++;\n}', explanation: '比较左右两半的顶部元素' }
        ],
        fullCode: `class Solution {
    public void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;

            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            merge(arr, l, m, r);
        }
    }

    private void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        int L[] = new int[n1];
        int R[] = new int[n2];

        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
        interviewTips: { keyPoints: ['稳定排序', '适合链表排序', '外部排序基础'], template: ['"归并排序的核心是分而治之"'] },
        summary: '归并排序通过递归将问题分解，再合并结果，是稳定且高效的排序算法。'
    },
    {
        id: 'heap-sort',
        title: '堆排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '堆排序是指利用堆这种数据结构所设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。',
        examples: [{ input: 'nums = [5,1,4,2,8]', output: '[1,2,4,5,8]' }],
        timeComplexity: 'O(n log n)',
        timeExplanation: '建堆O(n)，调整O(n log n)',
        spaceComplexity: 'O(1)',
        spaceExplanation: '原地排序',
        thinkingGuide: [
            { title: '堆的性质', question: '大顶堆有什么特点？', answer: '堆顶一定是最大元素。' },
            { title: '排序策略', question: '有了大顶堆怎么排序？', answer: '把堆顶（最大值）和末尾交换，排除末尾，再重新利用Heapify调整堆。' }
        ],
        codeImplementation: [
            { title: 'Heapify', code: 'if (largest != i) {\n    swap(arr, i, largest);\n    heapify(arr, n, largest);\n}', explanation: '维护堆性质，递归下沉' }
        ],
        fullCode: `class Solution {
    public void sort(int[] arr) {
        int n = arr.length;

        // Build heap (rearrange array)
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        // One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int l = 2 * i + 1; // left = 2*i + 1
        int r = 2 * i + 2; // right = 2*i + 2

        if (l < n && arr[l] > arr[largest])
            largest = l;

        if (r < n && arr[r] > arr[largest])
            largest = r;

        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            heapify(arr, n, largest);
        }
    }
}`,
        interviewTips: { keyPoints: ['不稳定排序', 'Top K 问题首选', 'O(1)空间'], template: ['"堆排序利用了完全二叉树的特性"'] },
        summary: '堆排序利用堆数据结构，实现了O(n log n)的时间复杂度和O(1)的空间复杂度，常用于Top K问题。'
    }
];
