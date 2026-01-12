import { Problem } from '../../types';

export const treeSearchingProblems: Problem[] = [
    {
        id: 'bst-search',
        title: '二叉搜索树查找',
        difficulty: 'medium',
        category: 'searching',
        description: '二叉搜索树（BST）的特性是：左子树所有节点值 < 根节点 < 右子树所有节点值。利用这个特性，查找操作类似于二分查找。',
        examples: [{ input: 'root = [4,2,7,1,3], val = 2', output: '[2,1,3]' }],
        timeComplexity: 'O(h)',
        timeExplanation: 'h是树高，最坏情况O(n)',
        spaceComplexity: 'O(h)',
        spaceExplanation: '递归栈深度',
        thinkingGuide: [
            { title: '方向决策', question: '目标值比当前节点小，往哪找？', answer: '往左子树找。' },
            { title: '方向决策', question: '目标值比当前节点大，往哪找？', answer: '往右子树找。' }
        ],
        codeImplementation: [
            { title: '递归查找', code: 'if (val < root.val) return searchBST(root.left, val);', explanation: '利用BST性质缩小范围' }
        ],
        fullCode: `class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        
        if (val < root.val)
            return searchBST(root.left, val);
            
        return searchBST(root.right, val);
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}`,
        interviewTips: { keyPoints: ['最坏退化成链表', '中序遍历有序', '基础数据结构'], template: ['"BST是二分查找在树结构上的体现"'] },
        summary: '二叉搜索树是所有高级搜索树的基础，但在最坏情况下性能不佳。'
    },
    {
        id: 'avl-search',
        title: 'AVL树查找',
        difficulty: 'hard',
        category: 'searching',
        description: 'AVL树是高度平衡的二叉搜索树。任意节点的两个子树的高度差（平衡因子）最大为1。这保证了树的高度始终是 O(log n)，因此查找效率稳定。',
        examples: [{ input: '查找逻辑同BST，但效率保证O(log n)', output: '' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '严格平衡',
        spaceComplexity: 'O(1)',
        spaceExplanation: '查找可以迭代实现',
        thinkingGuide: [
            { title: '平衡意义', question: '为什么要平衡？', answer: '保证查找路径不会过长，任何时候都在O(log n)内找到。' },
            { title: '查找过程', question: '查找过程和BST一样吗？', answer: '完全一样！复杂的只是插入和删除时的"旋转"操作。' }
        ],
        codeImplementation: [
            { title: '查找逻辑', code: 'while(root != null) {\n    if (val < root.val) root = root.left;\n    else if (val > root.val) root = root.right;\n    else return root;\n}', explanation: '迭代版查找，无需递归栈' }
        ],
        fullCode: `class Solution {
    // 查找代码与BST完全相同，区别在于树的构建保证了高度平衡
    public TreeNode searchAVL(TreeNode root, int val) {
        TreeNode current = root;
        while (current != null) {
            if (val == current.val) return current;
            else if (val < current.val) current = current.left;
            else current = current.right;
        }
        return null; // Not found
    }
    
    // AVL节点通常包含高度信息
    class AVLNode {
        int val, height;
        AVLNode left, right;
        AVLNode(int d) { val = d; height = 1; }
    }
}`,
        interviewTips: { keyPoints: ['严格平衡', '插入删除开销大（频繁旋转）', '查找效率最高'], template: ['"AVL树通过旋转维持平衡"', '"查找逻辑与BST一致"'] },
        summary: 'AVL树通过严格的平衡限制，提供了最坏情况下的最优查找效率，适合查多改少的场景。'
    },
    {
        id: 'red-black-search',
        title: '红黑树查找',
        difficulty: 'hard',
        category: 'searching',
        description: '红黑树是一种近似平衡的二叉搜索树。它确保从根到叶子的最长路径不超过最短路径的两倍，因此也能保证 O(log n) 的查找效率。它在插入和删除时的旋转次数少于AVL树。',
        examples: [{ input: 'Java TreeMap底层就是红黑树', output: '' }],
        timeComplexity: 'O(log n)',
        timeExplanation: '近似平衡',
        spaceComplexity: 'O(1)',
        spaceExplanation: '迭代实现',
        thinkingGuide: [
            { title: '对比AVL', question: '为什么工业界更喜欢红黑树？', answer: '因为它在插入删除时需要的旋转更少，维护成本低，虽然查询比AVL稍微慢一点点（高度略高），但综合性能更好。' }
        ],
        codeImplementation: [
            { title: '查找逻辑', code: '// 只有Node定义不同（带颜色）', explanation: '逻辑同BST' }
        ],
        fullCode: `class Solution {
    private static final boolean RED = true;
    private static final boolean BLACK = false;

    // 查找逻辑依然与BST相同
    public RBNode searchRB(RBNode root, int val) {
        RBNode current = root;
        while (current != null) {
            if (val == current.val) return current;
            else if (val < current.val) current = current.left;
            else current = current.right;
        }
        return null;
    }

    class RBNode {
        int val;
        RBNode left, right;
        boolean color; // 红色或黑色
        RBNode(int val) { this.val = val; }
    }
}`,
        interviewTips: { keyPoints: ['最广泛应用的平衡树', 'Java TreeMap/HashMap底层', '根叶黑、红红不邻、黑路同'], template: ['"红黑树是工程上的折衷选择"'] },
        summary: '红黑树在插入删除性能和查找性能之间取得了完美的平衡，是语言标准库中最常用的Map实现结构。'
    }
];
