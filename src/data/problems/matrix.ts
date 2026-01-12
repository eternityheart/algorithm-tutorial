import { Problem } from '../types';

export const matrixProblems: Problem[] = [
    {
        id: 'set-matrix-zeroes',
        title: '矩阵置零',
        difficulty: 'medium',
        category: 'matrix',
        description: '给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。',
        examples: [{ input: '[[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' }],
        timeComplexity: 'O(mn)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '利用首行首列做标记',
        thinkingGuide: [
            { title: '标记', question: '不用额外空间怎么标记？', answer: '用第一行和第一列来记录该行/列是否需要置零。' },
            { title: '注意', question: '第一行第一列自己怎么办？', answer: '单独用变量 `row0`, `col0` 记录它们自己是否要置零。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean row0 = false, col0 = false;
        
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) col0 = true;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) row0 = true;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        if (row0) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (col0) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}`,
        interviewTips: { keyPoints: ['O(1)空间的技巧'], template: ['"借用第一行第一列作为标记位"'] },
        summary: '空间优化的典型例子。'
    },
    {
        id: 'spiral-matrix',
        title: '螺旋矩阵',
        difficulty: 'medium',
        category: 'matrix',
        description: '给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。',
        examples: [{ input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }],
        timeComplexity: 'O(mn)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '模拟', question: '怎么控制方向？', answer: '维护上下左右四个边界 (top, bottom, left, right)，每遍历完一边就收缩边界。' }
        ],
        codeImplementation: [],
        fullCode: `import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (true) {
            for (int i = left; i <= right; i++) res.add(matrix[top][i]);
            if (++top > bottom) break;
            
            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            if (--right < left) break;
            
            for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);
            if (--bottom < top) break;
            
            for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
            if (++left > right) break;
        }
        return res;
    }
}`,
        interviewTips: { keyPoints: ['边界控制'], template: ['"四个边界，while true 循环，碰壁就break"'] },
        summary: '纯模拟题，考察代码逻辑的从容度。'
    },
    {
        id: 'rotate-image',
        title: '旋转图像',
        difficulty: 'medium',
        category: 'matrix',
        description: '给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。',
        examples: [{ input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' }],
        timeComplexity: 'O(n²)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '线性代数', question: '顺时针90度等于什么？', answer: '先转置(Transpose)，再左右翻转(Reverse)。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // 1. 转置
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // 2. 左右翻转
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`,
        interviewTips: { keyPoints: ['数学变换'], template: ['"转置 + 镜像"'] },
        summary: '记住这个数学性质，代码写起来最快。'
    },
    {
        id: 'search-a-2d-matrix-ii',
        title: '搜索二维矩阵 II',
        difficulty: 'medium',
        category: 'matrix',
        description: '编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：每行的元素从左到右升序排列。每列的元素从上到下升序排列。',
        examples: [{ input: 'matrix = [[1,...]], target = 5', output: 'true' }],
        timeComplexity: 'O(m+n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '起点选择', question: '从左上角开始好吗？', answer: '不好，往右往后都变大。要选右上角或左下角。' },
            { title: '右上角', question: '如果比 target 大怎么办？', answer: '那肯定不在这一列，col--。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int row = 0, col = n - 1;
        while (row < m && col >= 0) {
            if (matrix[row][col] == target) return true;
            else if (matrix[row][col] > target) col--;
            else row++;
        }
        return false;
    }
}`,
        interviewTips: { keyPoints: ['二叉搜索树性质'], template: ['"站在右上角，把它看作BST的根"'] },
        summary: '巧妙利用有序性质的查找问题。'
    }
];
