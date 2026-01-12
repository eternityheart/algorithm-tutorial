import { Problem } from '../../types';

export const linearSortingProblems: Problem[] = [
    {
        id: 'counting-sort',
        title: '计数排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '计数排序不是基于比较的排序算法。它的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。',
        examples: [{ input: 'nums = [2,5,3,0,2,3,0,3]', output: '[0,0,2,2,3,3,3,5]' }],
        timeComplexity: 'O(n+k)',
        timeExplanation: 'k是数据范围',
        spaceComplexity: 'O(n+k)',
        spaceExplanation: '需要计数数组和结果数组',
        thinkingGuide: [
            { title: '统计频率', question: '如何知道数字出现了几次？', answer: '开一个数组count，下标是数字，值是出现次数。' },
            { title: '还原数组', question: '有了频率怎么排序？', answer: '遍历count数组，根据次数把数字填回原数组。' }
        ],
        codeImplementation: [
            { title: '统计', code: 'count[arr[i]]++;', explanation: '统计每个数出现的次数' }
        ],
        fullCode: `class Solution {
    public void countingSort(int[] arr) {
        if (arr.length == 0) return;
        int max = arr[0];
        for(int x : arr) max = Math.max(max, x);
        
        int[] count = new int[max + 1];
        for(int x : arr) count[x]++;
        
        int index = 0;
        for(int i = 0; i <= max; i++) {
            while(count[i] > 0) {
                arr[index++] = i;
                count[i]--;
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['非比较排序', '通过空间换时间', '数据范围不能太大'], template: ['"计数排序适合范围有限的整数"'] },
        summary: '计数排序突破了比较排序O(n log n)的下限，但受限于数据范围。'
    },
    {
        id: 'radix-sort',
        title: '基数排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。',
        examples: [{ input: 'nums = [170, 45, 75, 90, 802, 24, 2, 66]', output: '[2, 24, 45, 66, 75, 90, 170, 802]' }],
        timeComplexity: 'O(nk)',
        timeExplanation: 'k是最大位数',
        spaceComplexity: 'O(n+k)',
        spaceExplanation: '计数排序的空间',
        thinkingGuide: [
            { title: '位处理', question: '怎么按位排序？', answer: '从个位开始，用稳定的计数排序对每一位进行排序。' }
        ],
        codeImplementation: [
            { title: '按位循环', code: 'for (int exp = 1; m / exp > 0; exp *= 10)', explanation: '从个位开始，指数增长' }
        ],
        fullCode: `class Solution {
    public void radixSort(int[] arr) {
        int m = getMax(arr);
        for (int exp = 1; m / exp > 0; exp *= 10)
            countSort(arr, exp);
    }
    
    // 对数组按照每一位进行计数排序
    void countSort(int[] arr, int exp) {
        int n = arr.length;
        int output[] = new int[n];
        int count[] = new int[10];
        
        for (int i = 0; i < n; i++)
            count[(arr[i] / exp) % 10]++;
            
        for (int i = 1; i < 10; i++)
            count[i] += count[i - 1];
            
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        
        for (int i = 0; i < n; i++)
            arr[i] = output[i];
    }
    
    int getMax(int[] arr) {
        int mx = arr[0];
        for (int i = 1; i < arr.length; i++)
            if (arr[i] > mx) mx = arr[i];
        return mx;
    }
}`,
        interviewTips: { keyPoints: ['必须使用稳定排序', '从低位到高位', '整数排序利器'], template: ['"基数排序是多轮计数排序"'] },
        summary: '基数排序通过"分配"和"收集"的过程，实现了多关键码的排序。'
    },
    {
        id: 'bucket-sort',
        title: '桶排序',
        difficulty: 'medium',
        category: 'sorting',
        description: '桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。桶排序的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序。',
        examples: [{ input: 'nums = [0.89, 0.56, 0.65, 0.12, 0.66, 0.34]', output: '[0.12, 0.34, 0.56, 0.65, 0.66, 0.89]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '均匀分布时最好',
        spaceComplexity: 'O(n)',
        spaceExplanation: '桶空间',
        thinkingGuide: [
            { title: '分桶', question: '怎么分桶？', answer: '把区间[0,1)划分成n个子区间（桶）。' },
            { title: '排序', question: '桶内怎么排？', answer: '每个桶内部单独排序（如插入排序）。' }
        ],
        codeImplementation: [
            { title: '入桶', code: 'int bi = (int)(n * arr[i]);\nbuckets[bi].add(arr[i]);', explanation: '计算索引并放入桶中' }
        ],
        fullCode: `import java.util.*;

class Solution {
    public void bucketSort(float[] arr) {
        int n = arr.length;
        if (n <= 0) return;
        
        // 1. Create buckets
        ArrayList<Float>[] buckets = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            buckets[i] = new ArrayList<Float>();
        }
        
        // 2. Add elements
        for (int i = 0; i < n; i++) {
            int idx = (int) (arr[i] * n);
            buckets[idx].add(arr[i]);
        }
        
        // 3. Sort buckets
        for (int i = 0; i < n; i++) {
            Collections.sort(buckets[i]);
        }
        
        // 4. Concatenate
        int index = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < buckets[i].size(); j++) {
                arr[index++] = buckets[i].get(j);
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['取决于数据分布', '桶内排序算法可选', '空间换时间'], template: ['"桶排序适合均匀分布的数据"'] },
        summary: '桶排序是鸽巢原理的应用，当数据均匀分布时效率极高。'
    }
];
