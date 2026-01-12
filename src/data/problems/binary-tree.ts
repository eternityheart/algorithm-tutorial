import { Problem } from '../types';

export const binaryTreeProblems: Problem[] = [
    {
        id: 'binary-tree-inorder-traversal',
        title: '二叉树的中序遍历',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '给定一个二叉树的根节点 root ，返回它的 中序 遍历。',
        examples: [{ input: 'root = [1,null,2,3]', output: '[1,3,2]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '遍历每个节点',
        spaceComplexity: 'O(n)',
        spaceExplanation: '栈空间',
        thinkingGuide: [
            { title: '递归 vs 迭代', question: '递归很简单，面试官让你用迭代怎么写？', answer: '需要模拟递归栈。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            res.add(curr.val);
            curr = curr.right;
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['迭代实现'], template: ['"一直向左走，入栈；没路了弹出，处理，转向右边"'] },
        summary: '基础中的基础。'
    },
    {
        id: 'maximum-depth-of-binary-tree',
        title: '二叉树的最大深度',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '给定一个二叉树，找出其最大深度。',
        examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(h)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '分治', question: '', answer: 'max(左, 右) + 1' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}`,
        interviewTips: { keyPoints: ['分治'], template: ['"左右比大小，加一"'] },
        summary: '递归入门。'
    },
    {
        id: 'invert-binary-tree',
        title: '翻转二叉树',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '翻转这棵二叉树，并返回其根节点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(h)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '交换', question: '', answer: '交换左右孩子，递归。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,
        interviewTips: { keyPoints: ['Homebrew作者的故事'], template: ['"每个节点都要交换其左右子树"'] },
        summary: '著名面试题。'
    },
    {
        id: 'symmetric-tree',
        title: '对称二叉树',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '检查它是否轴对称。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(h)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '镜像', question: '', answer: '左的左==右的右，左的右==右的左。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || isMirror(root.left, root.right);
    }
    boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val) && isMirror(t1.right, t2.left) && isMirror(t1.left, t2.right);
    }
}`,
        interviewTips: { keyPoints: ['辅助函数'], template: ['"定义一个helper函数比较两棵树"'] },
        summary: '递归逻辑训练。'
    },
    {
        id: 'diameter-of-binary-tree',
        title: '二叉树的直径',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '二叉树的直径是指树中任意两个节点之间最长路径的长度。这条路径可能穿过也可能不穿过根节点。',
        examples: [{ input: 'root = [1,2,3,4,5]', output: '3', explanation: '[4,2,1,3] 或 [5,2,1,3]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(h)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '转换', question: '某节点的"直径"贡献是什么？', answer: '左子树深度 + 右子树深度。我们要在遍历过程中维护这个全局最大值。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    int max = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return max;
    }
    int depth(TreeNode node) {
        if (node == null) return 0;
        int L = depth(node.left);
        int R = depth(node.right);
        max = Math.max(max, L + R); // 更新直径
        return Math.max(L, R) + 1;  // 返回深度
    }
}`,
        interviewTips: { keyPoints: ['后序遍历', '全局变量'], template: ['"深度函数顺便计算直径"'] },
        summary: '深度搜索的经典应用。'
    },
    {
        id: 'binary-tree-level-order-traversal',
        title: '二叉树的层序遍历',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。',
        examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '队列',
        thinkingGuide: [
            { title: 'BFS', question: '怎么一层层打印？', answer: '用队列。每次记录当前队列长度 size，循环 size 次取出这一层的节点。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();
                level.add(curr.val);
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['BFS模板'], template: ['"一次处理一层，记录size"'] },
        summary: 'BFS的基础模板题。'
    },
    {
        id: 'convert-sorted-array-to-binary-search-tree',
        title: '将有序数组转换为二叉搜索树',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。',
        examples: [{ input: 'nums = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(log n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '中点', question: '根节点选谁？', answer: '选数组中间的数，这样左右才平衡。然后递归构建左右子树。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }
    TreeNode helper(int[] nums, int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left = helper(nums, left, mid - 1);
        node.right = helper(nums, mid + 1, right);
        return node;
    }
}`,
        interviewTips: { keyPoints: ['中序遍历逆过程'], template: ['"取中点为根，递归构建"'] },
        summary: '分治法构建树。'
    },
    {
        id: 'validate-binary-search-tree',
        title: '验证二叉搜索树',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。',
        examples: [{ input: 'root = [2,1,3]', output: 'true' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '区间限制', question: '左孩子要小于根，右孩子要大于根，够吗？', answer: '不够。右子树的所有节点都要大于根。所以需要传递 min 和 max 范围限制。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) return true;
        if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`,
        interviewTips: { keyPoints: ['上下界传递'], template: ['"带着范围去递归"'] },
        summary: 'BST性质的核心考察。'
    },
    {
        id: 'kth-smallest-element-in-a-bst',
        title: '二叉搜索树中第K小的元素',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。',
        examples: [{ input: 'root = [3,1,4,null,2], k = 1', output: '1' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '中序', question: 'BST的中序遍历有什么特点？', answer: '是有序数组。直接中序遍历到第 k 个就是答案。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    int count = 0;
    int res = 0;
    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return res;
    }
    void inorder(TreeNode node, int k) {
        if (node == null) return;
        inorder(node.left, k);
        count++;
        if (count == k) {
            res = node.val;
            return;
        }
        inorder(node.right, k);
    }
}`,
        interviewTips: { keyPoints: ['中序性质'], template: ['"BST中序即排序"'] },
        summary: '利用BST性质解决问题。'
    },
    {
        id: 'binary-tree-right-side-view',
        title: '二叉树的右视图',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。',
        examples: [{ input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: 'BFS', question: '每层看谁？', answer: '看每层和最后一个节点。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();
                if (i == size - 1) res.add(curr.val);
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['BFS层序'], template: ['"取每层的最后一个元素"'] },
        summary: 'BFS变体。'
    },
    {
        id: 'flatten-binary-tree-to-linked-list',
        title: '二叉树展开为链表',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给你二叉树的根结点 root ，请你将它展开为一个单链表：展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。',
        examples: [{ input: 'root = [1,2,5...]', output: '[1,null,2,null,3...]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '后序', question: '要原地修改，先处理谁？', answer: '先把左右孩子拉直，再拼接。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public void flatten(TreeNode root) {
        if (root == null) return;
        flatten(root.left);
        flatten(root.right);
        
        TreeNode left = root.left;
        TreeNode right = root.right;
        
        root.left = null;
        root.right = left;
        
        TreeNode curr = root;
        while (curr.right != null) curr = curr.right;
        curr.right = right;
    }
}`,
        interviewTips: { keyPoints: ['递归逻辑'], template: ['"把左边搬到右边，原来的右边接在后面"'] },
        summary: '树的结构变换。'
    },
    {
        id: 'construct-binary-tree-from-preorder-and-inorder-traversal',
        title: '从前序与中序遍历构造二叉树',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给定两个整数数组 preorder 和 inorder ，构造二叉树并返回其根节点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '根在哪', question: 'preorder第一个数是什么？', answer: '根节点。' },
            { title: '切分', question: '知道根了，怎么分左右子树？', answer: '在 inorder 里找到根的位置，左边就是左子树，右边就是右子树。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    Map<Integer, Integer> map = new HashMap<>();
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) map.put(inorder[i], i);
        return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }
    TreeNode helper(int[] preorder, int pStart, int pEnd, int[] inorder, int iStart, int iEnd) {
        if (pStart > pEnd) return null;
        int rootVal = preorder[pStart];
        int index = map.get(rootVal);
        int leftSize = index - iStart;
        
        TreeNode root = new TreeNode(rootVal);
        root.left = helper(preorder, pStart + 1, pStart + leftSize, inorder, iStart, index - 1);
        root.right = helper(preorder, pStart + leftSize + 1, pEnd, inorder, index + 1, iEnd);
        return root;
    }
}`,
        interviewTips: { keyPoints: ['哈希表优化查找', '索引计算'], template: ['"前序定根，中序定界"'] },
        summary: '经典构造题，考察对遍历序列的理解。'
    },
    {
        id: 'path-sum-iii',
        title: '路径总和 III',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。',
        examples: [{ input: 'root = [10,5,-3...], targetSum = 8', output: '3' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '双重递归', question: '暴力法？', answer: '每个节点都出发一次DFS。' },
            { title: '前缀和', question: '优化？', answer: '在DFS路径上维护前缀和 map，类似"和为K的子数组"。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    Map<Long, Integer> prefixMap = new HashMap<>();
    public int pathSum(TreeNode root, int targetSum) {
        prefixMap.put(0L, 1);
        return dfs(root, 0, targetSum);
    }
    int dfs(TreeNode node, long currSum, int target) {
        if (node == null) return 0;
        currSum += node.val;
        int res = prefixMap.getOrDefault(currSum - target, 0);
        prefixMap.put(currSum, prefixMap.getOrDefault(currSum, 0) + 1);
        
        res += dfs(node.left, currSum, target);
        res += dfs(node.right, currSum, target);
        
        prefixMap.put(currSum, prefixMap.get(currSum) - 1); // 回溯
        return res;
    }
}`,
        interviewTips: { keyPoints: ['树上前缀和', 'long防止溢出'], template: ['"前缀和+回溯，降维打击"'] },
        summary: '难点在于结合前缀和优化的树形DFS。'
    },
    {
        id: 'lowest-common-ancestor-of-a-binary-tree',
        title: '二叉树的最近公共祖先',
        difficulty: 'medium',
        category: 'binary-tree',
        description: '给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。',
        examples: [{ input: 'root = [3,5,1...], p = 5, q = 1', output: '3' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '后序', question: '怎么汇聚信息？', answer: '如果左边找到了，右边也找到了，那我就是祖先。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if (left != null && right != null) return root; // 左右各一个
        return left != null ? left : right;
    }
}`,
        interviewTips: { keyPoints: ['递归返回值含义'], template: ['"我是p或q吗？左边有吗？右边有吗？"'] },
        summary: '极简代码，深刻逻辑。'
    },
    {
        id: 'binary-tree-maximum-path-sum',
        title: '二叉树中的最大路径和',
        difficulty: 'hard',
        category: 'binary-tree',
        description: '路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列... 返回其最大路径和。',
        examples: [{ input: 'root = [-10,9,20,15,7]', output: '42' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '贡献', question: '一个节点能给父节点贡献多少？', answer: 'max(左贡献, 右贡献) + val。' },
            { title: '拐点', question: '如果我是拐点？', answer: '那路径是 左 + 我 + 右。我们要维护这个全局最大值。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    int maxSum = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }
    int maxGain(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(maxGain(node.left), 0);
        int rightGain = Math.max(maxGain(node.right), 0);
        
        int priceNewPath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, priceNewPath);
        
        return node.val + Math.max(leftGain, rightGain);
    }
}`,
        interviewTips: { keyPoints: ['全局变量', '舍弃负贡献'], template: ['"单边最大贡献 vs 内部最大路径"'] },
        summary: '树形DP的经典难题。'
    },
    {
        id: 'balanced-binary-tree',
        title: '平衡二叉树',
        difficulty: 'easy',
        category: 'binary-tree',
        description: '给定一个二叉树，判断它是否是高度平衡的二叉树。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(n)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '自底向上', question: '怎么避免重复计算高度？', answer: 'getHeight函数，不平衡返回-1。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }
    int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        if (left == -1) return -1;
        int right = height(node.right);
        if (right == -1) return -1;
        
        if (Math.abs(left - right) > 1) return -1;
        return Math.max(left, right) + 1;
    }
}`,
        interviewTips: { keyPoints: ['返回值为-1标记不平衡'], template: ['"发现不平衡立即上报"'] },
        summary: '用特殊返回值优化递归。'
    }
];
