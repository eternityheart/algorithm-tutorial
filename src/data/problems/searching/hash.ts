import { Problem } from '../../types';

export const hashSearchingProblem: Problem = {
    id: 'hash-search',
    title: '哈希查找',
    difficulty: 'medium',
    category: 'searching',
    description: '哈希查找（Hash Search）是通过计算数据元素的存储地址进行查找的一种方法。也就是利用哈希表（Hash Table）进行查找。哈希查找的查找时间复杂度理论上是 O(1)。',
    examples: [{ input: 'put(1, 10), get(1)', output: '10' }],
    timeComplexity: 'O(1)',
    timeExplanation: '平均情况常数时间',
    spaceComplexity: 'O(n)',
    spaceExplanation: '需要存储所有元素',
    thinkingGuide: [
        { title: '映射思想', question: '如何瞬间找到书架上的书？', answer: '如果有目录说"书号X在第Y排"，就能直接去拿。哈希函数就是这个目录。' },
        { title: '冲突处理', question: '如果两本书算出来在同一个位置怎么办？', answer: '可以挂一个链表（拉链法），或者往后找空位（开放寻址法）。' }
    ],
    codeImplementation: [
        { title: '哈希函数', code: 'int index = key % SIZE;', explanation: '计算存储位置' },
        { title: '拉链法', code: 'LinkedList<Node> bucket = table[index];', explanation: '处理冲突' }
    ],
    fullCode: `import java.util.LinkedList;

class HashTable {
    class Node {
        int key, value;
        public Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private int SIZE = 1000;
    private LinkedList<Node>[] table;
    
    public HashTable() {
        table = new LinkedList[SIZE];
        for (int i = 0; i < SIZE; i++) {
            table[i] = new LinkedList<>();
        }
    }
    
    private int hash(int key) {
        return key % SIZE;
    }
    
    public void put(int key, int value) {
        int idx = hash(key);
        for (Node node : table[idx]) {
            if (node.key == key) {
                node.value = value;
                return;
            }
        }
        table[idx].add(new Node(key, value));
    }
    
    public int get(int key) {
        int idx = hash(key);
        for (Node node : table[idx]) {
            if (node.key == key) return node.value;
        }
        return -1;
    }
}`,
    interviewTips: { keyPoints: ['必须了解解决冲突的两种方法', '哈希函数的选择', '扩容机制（Load Factor）'], template: ['"哈希查找本质是键值映射"'] },
    summary: '哈希查找利用散列函数实现理论上的O(1)查找，是现代编程中最重要的数据结构之一。'
};
