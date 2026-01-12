import { Problem } from '../types';

export const linkedListProblems: Problem[] = [
    {
        id: 'intersection-of-two-linked-lists',
        title: '相交链表',
        difficulty: 'easy',
        category: 'linked-list',
        description: '给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。',
        examples: [{ input: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]', output: 'Reference of the node with value = 8' }],
        timeComplexity: 'O(m+n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '浪漫相遇', question: '长度不一样怎么一起走？', answer: '我走完我的路，再走你的路。你走完你的路，再走我的路。如果相交，我们会在终点相遇。' }
        ],
        codeImplementation: [],
        fullCode: `public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        ListNode pA = headA, pB = headB;
        while (pA != pB) {
            pA = pA == null ? headB : pA.next;
            pB = pB == null ? headA : pB.next;
        }
        return pA;
    }
}`,
        interviewTips: { keyPoints: ['双指针技巧'], template: ['"A+B = B+A"'] },
        summary: '极具美学的算法。'
    },
    {
        id: 'reverse-linked-list',
        title: '反转链表',
        difficulty: 'easy',
        category: 'linked-list',
        description: '给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。',
        examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '迭代', question: '需要几个指针？', answer: '三个：prev, curr, next。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
        interviewTips: { keyPoints: ['迭代和递归都要会'], template: ['"保存next，指向prev，移动curr"'] },
        summary: '链表基本功。'
    },
    {
        id: 'palindrome-linked-list',
        title: '回文链表',
        difficulty: 'easy',
        category: 'linked-list',
        description: '给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。',
        examples: [{ input: 'head = [1,2,2,1]', output: 'true' }],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '快慢指针', question: '怎么找中间？', answer: '快慢指针找中点。' },
            { title: '翻转', question: '然后呢？', answer: '翻转后半部分，然后和前半部分比较。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode fast = head, slow = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }
        if (fast != null) slow = slow.next; // 奇数个
        
        slow = reverse(slow);
        fast = head;
        
        while (slow != null) {
            if (fast.val != slow.val) return false;
            fast = fast.next;
            slow = slow.next;
        }
        return true;
    }
    ListNode reverse(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
}`,
        interviewTips: { keyPoints: ['快慢指针', '反转链表'], template: ['"切半，翻转，对比"'] },
        summary: '综合了快慢指针和反转链表的操作。'
    },
    {
        id: 'linked-list-cycle',
        title: '环形链表',
        difficulty: 'easy',
        category: 'linked-list',
        description: '判断链表中是否有环。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '追及问题', question: '兔子跑得快', answer: '如果有环，快指针一定能追上慢指针。' }],
        codeImplementation: [],
        fullCode: `public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
        interviewTips: { keyPoints: ['Floyd判圈'], template: ['"快慢指针追击"'] },
        summary: '经典题。'
    },
    {
        id: 'linked-list-cycle-ii',
        title: '环形链表 II',
        difficulty: 'medium',
        category: 'linked-list',
        description: '返回链表开始入环的第一个节点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '数学推导', question: '相遇后怎么办？', answer: '一个指针从头走，一个指针从相遇点走，会在入口相遇（a = c）。' }
        ],
        codeImplementation: [],
        fullCode: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}`,
        interviewTips: { keyPoints: ['a=c推导'], template: ['"相遇后，慢指针回退，同步走"'] },
        summary: '需要数学证明的题目。'
    },
    {
        id: 'merge-two-sorted-lists',
        title: '合并两个有序链表',
        difficulty: 'easy',
        category: 'linked-list',
        description: '将两个升序链表合并为一个新的 升序 链表并返回。',
        examples: [],
        timeComplexity: 'O(n+m)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '虚拟头', question: '怎么方便操作？', answer: '用 dummy head。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        curr.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
        interviewTips: { keyPoints: ['Dummy节点'], template: ['"穿针引线"'] },
        summary: '归并排序的子步骤。'
    },
    {
        id: 'add-two-numbers',
        title: '两数相加',
        difficulty: 'medium',
        category: 'linked-list',
        description: '两个非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。请你将两个数相加，并以相同形式返回一个表示和的链表。',
        examples: [{ input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]' }],
        timeComplexity: 'O(max(m,n))',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '进位', question: 'carry 怎么处理？', answer: 'sum = x + y + carry。carry = sum / 10。新节点 sum % 10。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode p = l1, q = l2, curr = dummy;
        int carry = 0;
        while (p != null || q != null) {
            int x = (p != null) ? p.val : 0;
            int y = (q != null) ? q.val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (p != null) p = p.next;
            if (q != null) q = q.next;
        }
        if (carry > 0) {
            curr.next = new ListNode(carry);
        }
        return dummy.next;
    }
}`,
        interviewTips: { keyPoints: ['保持循环直到carry==0'], template: ['"模拟大数加法"'] },
        summary: '链表模拟题。'
    },
    {
        id: 'remove-nth-node-from-end-of-list',
        title: '删除链表的倒数第 N 个结点',
        difficulty: 'medium',
        category: 'linked-list',
        description: '给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '双指针', question: '怎么只扫描一次？', answer: '快指针先走 n 步，然后慢指针从头出发。快指针到尽头时，慢指针刚好到倒数第 n+1 个位置。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy;
        ListNode second = dummy;
        for (int i = 0; i <= n; i++) first = first.next;
        
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        second.next = second.next.next;
        return dummy.next;
    }
}`,
        interviewTips: { keyPoints: ['快慢指针的间距'], template: ['"让快指针先领先N步"'] },
        summary: '经典快慢指针应用。'
    },
    {
        id: 'swap-nodes-in-pairs',
        title: '两两交换链表中的节点',
        difficulty: 'medium',
        category: 'linked-list',
        description: '给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [
            { title: '递归', question: '怎么简化思维？', answer: 'swap(head) = head.next -> head -> swap(rest)。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode next = head.next;
        head.next = swapPairs(next.next);
        next.next = head;
        return next;
    }
}`,
        interviewTips: { keyPoints: ['递归或者迭代'], template: ['"递归最简洁"'] },
        summary: '操作指针的微型手术。'
    },
    {
        id: 'reverse-nodes-in-k-group',
        title: 'K 个一组翻转链表',
        difficulty: 'hard',
        category: 'linked-list',
        description: 'K 个一组翻转链表。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '分治', question: '', answer: '先翻转前k个，然后递归处理剩下的。如果有剩余不够k个则不翻转。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode cursor = head;
        int count = 0;
        while(cursor != null && count < k) {
            cursor = cursor.next;
            count++;
        }
        if(count == k) {
            ListNode revHead = reverse(head, k);
            head.next = reverseKGroup(cursor, k);
            return revHead;
        }
        return head;
    }
    ListNode reverse(ListNode head, int k) {
        ListNode prev = null, curr = head;
        while(k-- > 0) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
        interviewTips: { keyPoints: ['递归'], template: ['"能够复用ReverseList的逻辑"'] },
        summary: 'Hard题中的高频题。'
    },
    {
        id: 'copy-list-with-random-pointer',
        title: '随机链表的复制',
        difficulty: 'medium',
        category: 'linked-list',
        description: '复制一个带有 random 指针的链表。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '拼接法优化',
        thinkingGuide: [
            { title: '拼接', question: '不用Map怎么映射？', answer: '把新节点插在原节点后面：A->A\'->B->B\'。这样 A.next.random = A.random.next。' }
        ],
        codeImplementation: [],
        fullCode: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        Node curr = head;
        // 1. 复制节点
        while (curr != null) {
            Node next = curr.next;
            Node copy = new Node(curr.val);
            curr.next = copy;
            copy.next = next;
            curr = next;
        }
        // 2. 复制random
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }
        // 3. 拆分
        curr = head;
        Node newHead = head.next;
        Node copyCurr = newHead;
        while (curr != null) {
            curr.next = curr.next.next;
            if (copyCurr.next != null) {
                copyCurr.next = copyCurr.next.next;
            }
            curr = curr.next;
            copyCurr = copyCurr.next;
        }
        return newHead;
    }
}`,
        interviewTips: { keyPoints: ['O(1)空间的技巧'], template: ['"一分二，二分一"'] },
        summary: '深拷贝的技巧展示。'
    },
    {
        id: 'sort-list',
        title: '排序链表',
        difficulty: 'medium',
        category: 'linked-list',
        description: 'O(n log n) 时间复杂度对链表排序。',
        examples: [],
        timeComplexity: 'O(n log n)',
        timeExplanation: '',
        spaceComplexity: 'O(log n)',
        spaceExplanation: '递归栈',
        thinkingGuide: [{ title: '归并', question: '最适合链表的排序？', answer: '归并排序。找中点断开，递归排序，再合并。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null; // 断开
        ListNode l1 = sortList(head);
        ListNode l2 = sortList(slow);
        return merge(l1, l2);
    }
    ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), curr = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
            else { curr.next = l2; l2 = l2.next; }
            curr = curr.next;
        }
        curr.next = l1 != null ? l1 : l2;
        return dummy.next;
    }
}`,
        interviewTips: { keyPoints: ['归并排序'], template: ['"找中点，断开，归并"'] },
        summary: '链表排序的标准解法。'
    },
    {
        id: 'merge-k-sorted-lists',
        title: '合并 K 个升序链表',
        difficulty: 'hard',
        category: 'linked-list',
        description: '合并 k 个升序链表。',
        examples: [],
        timeComplexity: 'O(N log k)',
        timeExplanation: '',
        spaceComplexity: 'O(k)',
        spaceExplanation: '堆',
        thinkingGuide: [{ title: '优先队列', question: '怎么选最小的？', answer: '把k个头节点放入小顶堆。每次取出最小的，把它的next放入堆。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b) -> a.val-b.val);
        for (ListNode node : lists) if (node != null) pq.offer(node);
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (!pq.isEmpty()) {
            ListNode min = pq.poll();
            curr.next = min;
            curr = curr.next;
            if (min.next != null) pq.offer(min.next);
        }
        return dummy.next;
    }
}`,
        interviewTips: { keyPoints: ['堆的应用'], template: ['"多路归并，借助PQ"'] },
        summary: '多路归并经典题。'
    },
    {
        id: 'lru-cache',
        title: 'LRU 缓存',
        difficulty: 'medium',
        category: 'linked-list',
        description: '设计LRU。',
        examples: [],
        timeComplexity: 'O(1)',
        timeExplanation: '',
        spaceComplexity: 'O(capacity)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '哈希+双链表', question: '怎么实现O(1)查找和移动？', answer: 'Map存(key, node)，双向链表存顺序。访问时移到表头，超容时删表尾。' }],
        codeImplementation: [],
        fullCode: `class LRUCache {
    class Node { int key, val; Node prev, next; Node(int k, int v){key=k;val=v;} }
    private Map<Integer, Node> map = new HashMap<>();
    private Node head = new Node(0, 0), tail = new Node(0, 0);
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail; tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        add(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            remove(map.remove(tail.prev.key));
        }
        add(new Node(key, value));
        map.put(key, head.next);
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    private void add(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`,
        interviewTips: { keyPoints: ['HashMap + DoubleLinkedList'], template: ['"必须手写双向链表API"'] },
        summary: '系统设计高频题。'
    },
    {
        id: 'remove-linked-list-elements',
        title: '移除链表元素',
        difficulty: 'easy',
        category: 'linked-list',
        description: '删除所有值为 val 的节点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '虚拟头', question: '', answer: '可能删除头节点，所以用dummy。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode curr = dummy;
        while (curr.next != null) {
            if (curr.next.val == val) curr.next = curr.next.next;
            else curr = curr.next;
        }
        return dummy.next;
    }
}`,
        interviewTips: { keyPoints: ['Dummy Node'], template: ['"哨兵节点简化边界"'] },
        summary: '基础操作。'
    },
    {
        id: 'middle-of-the-linked-list',
        title: '链表的中间结点',
        difficulty: 'easy',
        category: 'linked-list',
        description: '返回中间结点。',
        examples: [],
        timeComplexity: 'O(n)',
        timeExplanation: '',
        spaceComplexity: 'O(1)',
        spaceExplanation: '',
        thinkingGuide: [{ title: '快慢指针', question: '', answer: '快指针走两步，慢指针走一步。' }],
        codeImplementation: [],
        fullCode: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
        interviewTips: { keyPoints: ['快慢指针'], template: ['"快的一步两格，慢的一步一格"'] },
        summary: '快慢指针基础。'
    }
];
