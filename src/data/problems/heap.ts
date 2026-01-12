import { Problem } from '../types';

export const heapProblems: Problem[] = [
    {
        id: 'kth-largest-element-in-an-array',
        title: '数组中的第K个最大元素',
        difficulty: 'medium',
        category: 'heap',
        description: '给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。',
        examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
        timeComplexity: 'O(n log k)',
        timeExplanation: '堆',
        spaceComplexity: 'O(k)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '小顶堆', question: '为什么要小顶堆？', answer: '堆里存前 k 大的数。堆顶就是这k个数里最小的（即第k大）。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // 小顶堆，大小为k
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int num : nums) {
            pq.offer(num);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        return pq.peek();
    }
}`,
        interviewTips: { keyPoints: ['快速选择算法是O(n)'], template: ['"TopK问题必用堆"'] },
        summary: 'TopK问题的标准解法。'
    },
    {
        id: 'top-k-frequent-elements',
        title: '前 K 个高频元素',
        difficulty: 'medium',
        category: 'heap',
        description: '给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。',
        examples: [],
        timeComplexity: 'O(n log k)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '统计', question: '第一步？', answer: 'HashMap 统计频率。' }, { title: '堆', question: '第二步？', answer: '小顶堆存 Map.Entry，按频率排序。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int n: nums) map.put(n, map.getOrDefault(n,0)+1);
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[1]-b[1]);
        for(var entry : map.entrySet()){
            pq.offer(new int[]{entry.getKey(), entry.getValue()});
            if(pq.size()>k) pq.poll();
        }
        
        int[] res = new int[k];
        for(int i=0; i<k; i++) res[i] = pq.poll()[0];
        return res;
    }
}`,
        interviewTips: { keyPoints: ['桶排序可以O(n)'], template: ['"哈希统计+堆排序"'] },
        summary: '频率统计问题。'
    },
    {
        id: 'find-median-from-data-stream',
        title: '数据流的中位数',
        difficulty: 'hard',
        category: 'heap',
        description: '设计一个支持 addNum 和 findMedian 的数据结构。',
        examples: [],
        timeComplexity: 'add: O(log n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '双堆', question: '怎么维护中位？', answer: '大顶堆存较小的一半，小顶堆存较大的一半。平衡两个堆的大小。' }],
        codeImplementation: [],
        fullCode: `class MedianFinder {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // 存大数
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a,b)->b-a); // 存小数

    public void addNum(int num) {
        if (maxHeap.isEmpty() || num <= maxHeap.peek()) {
            maxHeap.offer(num);
        } else {
            minHeap.offer(num);
        }
        // 平衡
        if (maxHeap.size() > minHeap.size() + 1) minHeap.offer(maxHeap.poll());
        else if (minHeap.size() > maxHeap.size()) maxHeap.offer(minHeap.poll());
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
        interviewTips: { keyPoints: ['对顶堆'], template: ['"一头大一头小，中间就是中位数"'] },
        summary: '双堆技巧的经典应用。'
    }
];
