import React, { useState } from 'react';
import { Problem, Category } from '../../data/problemsData';

interface ProblemPageProps {
    problem: Problem;
    category: Category;
    currentIndex: number;
    totalCount: number;
    onBack: () => void;
    onNavigate: (direction: 'prev' | 'next') => void;
}

const ProblemPage: React.FC<ProblemPageProps> = ({
    problem, category, currentIndex, totalCount, onBack, onNavigate
}) => {
    const [activeTab, setActiveTab] = useState<'thinking' | 'code' | 'full' | 'interview'>('thinking');
    const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);
    const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
    const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
    const [codeStep, setCodeStep] = useState(0);

    const toggleStep = (index: number) => {
        setExpandedSteps(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const tabs = [
        { id: 'thinking', label: '思路引导', icon: '⊕' },
        { id: 'code', label: '代码实现', icon: '</>' },
        { id: 'full', label: '完整代码', icon: '>_' },
        { id: 'interview', label: '面试技巧', icon: '▢' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* 顶部导航 */}
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '14px' }}>
                        ← 返回
                    </button>
                    <span className={`tag tag-${problem.difficulty}`}>
                        {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: category.color }}>
                        <span>{category.icon}</span> {category.name}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{currentIndex} / {totalCount}</span>
                    <button onClick={() => onNavigate('prev')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px' }}>‹ 上一题</button>
                    <button onClick={() => onNavigate('next')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px' }}>下一题 ›</button>
                </div>
            </header>

            {/* 主体内容 */}
            <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', minHeight: 'calc(100vh - 65px)' }}>
                {/* 左侧：题目描述 */}
                <aside style={{ padding: '32px', borderRight: '1px solid var(--border-color)', overflowY: 'auto' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>{problem.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '28px' }}>{problem.description}</p>

                    {/* 示例 */}
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            <span style={{ color: 'var(--accent-cyan)' }}>▷</span> 示例
                        </h3>
                        {problem.examples.map((example, i) => (
                            <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '16px', marginBottom: '12px' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>输入：</span>
                                    <code style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{example.input}</code>
                                </div>
                                <div style={{ marginBottom: example.explanation ? '8px' : 0 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>输出：</span>
                                    <code style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>{example.output}</code>
                                </div>
                                {example.explanation && (
                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>{example.explanation}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 复杂度分析 */}
                    <div>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                            <span style={{ color: 'var(--accent-orange)' }}>⏱</span> 复杂度分析
                        </h3>
                        <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--accent-yellow)' }}>⚡</span>
                                <div>
                                    <span style={{ color: 'var(--text-muted)' }}>时间：</span>
                                    <strong style={{ color: 'var(--accent-cyan)' }}>{problem.timeComplexity}</strong>
                                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{problem.timeExplanation}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>☰</span>
                                <div>
                                    <span style={{ color: 'var(--text-muted)' }}>空间：</span>
                                    <strong style={{ color: 'var(--accent-cyan)' }}>{problem.spaceComplexity}</strong>
                                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>{problem.spaceExplanation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* 右侧：教学内容 */}
                <main style={{ padding: '32px', overflowY: 'auto' }}>
                    {/* Tab 切换 */}
                    <div className="tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id as any)}
                            >
                                <span>{tab.icon}</span> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* 思路引导 */}
                    {activeTab === 'thinking' && (
                        <div className="animate-fade-in">
                            <div className="hint-box tip" style={{ marginBottom: '24px' }}>
                                <div className="hint-label">💡 学习方法</div>
                                <p>先自己思考每个问题，再查看提示和答案。这样能更好地理解解题思路。</p>
                            </div>

                            <div className="accordion">
                                {problem.thinkingGuide.map((step, index) => (
                                    <div key={index} className={`accordion-item ${expandedSteps.includes(index) ? 'open' : ''}`}>
                                        <div className="accordion-header" onClick={() => toggleStep(index)}>
                                            <div className="accordion-icon">{index + 1}</div>
                                            <span className="accordion-title">{step.title}</span>
                                            <span className="accordion-arrow">▼</span>
                                        </div>
                                        <div className="accordion-content">
                                            <div className="accordion-body">
                                                {step.question && (
                                                    <div className="hint-box question">
                                                        <div className="hint-label">❓ 思考问题</div>
                                                        <p>{step.question}</p>
                                                    </div>
                                                )}
                                                {step.hint && (
                                                    <div style={{ marginTop: '12px' }}>
                                                        <button
                                                            onClick={() => setShowHints({ ...showHints, [index]: !showHints[index] })}
                                                            style={{ background: 'none', border: 'none', color: 'var(--accent-yellow)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                                        >
                                                            💡 {showHints[index] ? '隐藏提示' : '查看提示'}
                                                        </button>
                                                        {showHints[index] && (
                                                            <div className="hint-box tip" style={{ marginTop: '8px' }}>
                                                                <div className="hint-label">💡 提示</div>
                                                                <p>{step.hint}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {step.answer && (
                                                    <div style={{ marginTop: '12px' }}>
                                                        <button
                                                            onClick={() => setShowAnswers({ ...showAnswers, [index]: !showAnswers[index] })}
                                                            style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                                        >
                                                            ✨ {showAnswers[index] ? '隐藏答案' : '查看答案'}
                                                        </button>
                                                        {showAnswers[index] && (
                                                            <div className="hint-box answer" style={{ marginTop: '8px' }}>
                                                                <div className="hint-label">✨ 答案解析</div>
                                                                <p>{step.answer}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {step.content && <p style={{ color: 'var(--text-secondary)' }}>{step.content}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 代码实现 */}
                    {activeTab === 'code' && (
                        <div className="animate-fade-in">
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>代码构建步骤</h3>

                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                {problem.codeImplementation.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCodeStep(index)}
                                        style={{
                                            padding: '8px 16px',
                                            background: codeStep === index ? 'var(--accent-cyan)' : 'var(--bg-card)',
                                            border: 'none',
                                            borderRadius: '20px',
                                            color: codeStep === index ? '#000' : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {index + 1}. {problem.codeImplementation[index].title}
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                                    {problem.codeImplementation[codeStep].title}
                                </h4>
                                <div className="code-block">
                                    <div className="code-header">
                                        <span className="code-dot red"></span>
                                        <span className="code-dot yellow"></span>
                                        <span className="code-dot green"></span>
                                        <span className="code-title">Solution.java</span>
                                    </div>
                                    <div className="code-content">
                                        <pre><code>{problem.codeImplementation[codeStep].code}</code></pre>
                                    </div>
                                </div>
                                <div className="hint-box answer" style={{ marginTop: '16px' }}>
                                    <div className="hint-label">💡 代码解释</div>
                                    <p>{problem.codeImplementation[codeStep].explanation}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button
                                    onClick={() => setCodeStep(Math.max(0, codeStep - 1))}
                                    disabled={codeStep === 0}
                                    style={{ padding: '10px 24px', background: codeStep === 0 ? 'var(--bg-tertiary)' : 'var(--bg-card)', border: 'none', borderRadius: '8px', color: codeStep === 0 ? 'var(--text-muted)' : 'var(--text-primary)', cursor: codeStep === 0 ? 'not-allowed' : 'pointer' }}
                                >
                                    上一步
                                </button>
                                <span style={{ color: 'var(--text-muted)' }}>{codeStep + 1} / {problem.codeImplementation.length}</span>
                                <button
                                    onClick={() => setCodeStep(Math.min(problem.codeImplementation.length - 1, codeStep + 1))}
                                    disabled={codeStep === problem.codeImplementation.length - 1}
                                    style={{ padding: '10px 24px', background: codeStep === problem.codeImplementation.length - 1 ? 'var(--bg-tertiary)' : 'var(--accent-cyan)', border: 'none', borderRadius: '8px', color: codeStep === problem.codeImplementation.length - 1 ? 'var(--text-muted)' : '#000', cursor: codeStep === problem.codeImplementation.length - 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    下一步
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 完整代码 */}
                    {activeTab === 'full' && (
                        <div className="animate-fade-in">
                            <div className="code-block" style={{ marginBottom: '24px' }}>
                                <div className="code-header">
                                    <span className="code-dot red"></span>
                                    <span className="code-dot yellow"></span>
                                    <span className="code-dot green"></span>
                                    <span className="code-title">Solution.java - 完整代码</span>
                                    <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>📋</button>
                                </div>
                                <div className="code-content">
                                    <pre><code>{problem.fullCode}</code></pre>
                                </div>
                            </div>

                            <div className="hint-box answer">
                                <div className="hint-label">📝 题目总结</div>
                                <p>{problem.summary}</p>
                            </div>
                        </div>
                    )}

                    {/* 面试技巧 */}
                    {activeTab === 'interview' && (
                        <div className="animate-fade-in">
                            <div className="hint-box warning" style={{ marginBottom: '24px' }}>
                                <div className="hint-label">💼 面试建议</div>
                                <p>不要直接写代码，先和面试官沟通思路，展示你的分析能力。</p>
                            </div>

                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>⊙ 面试回答要点</h3>
                            <div style={{ marginBottom: '28px' }}>
                                {problem.interviewTips.keyPoints.map((point, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', padding: '16px', background: 'var(--bg-card)', borderRadius: '10px' }}>
                                        <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', flexShrink: 0 }}>{index + 1}</span>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{point}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>✨ 面试表达模板</h3>
                            <div style={{ background: 'var(--bg-card)', borderRadius: '10px', padding: '20px' }}>
                                {problem.interviewTips.template.map((tpl, index) => (
                                    <p key={index} style={{ color: 'var(--text-secondary)', marginBottom: '12px', paddingLeft: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                                        {index + 1}. {tpl}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProblemPage;
