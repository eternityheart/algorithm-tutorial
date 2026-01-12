import React, { useState, useMemo } from 'react';
import { categories, problemsData, Problem, Category } from '../../data/problemsData';

interface HomeProps {
    onProblemSelect: (problem: Problem, category: Category, problems: Problem[]) => void;
}

const Home: React.FC<HomeProps> = ({ onProblemSelect }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['hash']);

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const selectAll = () => {
        setSelectedCategories(categories.map(c => c.id));
    };

    const clearAll = () => {
        setSelectedCategories([]);
    };

    const selectedProblemsCount = useMemo(() => {
        return selectedCategories.reduce((total, catId) => {
            const cat = categories.find(c => c.id === catId);
            return total + (cat?.count || 0);
        }, 0);
    }, [selectedCategories]);

    const getProblemsForCategory = (categoryId: string): Problem[] => {
        return problemsData[categoryId] || [];
    };

    return (
        <div style={{ minHeight: '100vh', padding: '40px 60px' }}>
            {/* 头部 */}
            <header style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '24px' }}>{'>'}_</span>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', background: 'linear-gradient(135deg, #ff6b9d, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        算法通关教程
                    </h1>
                    <span style={{ fontSize: '14px', color: '#a0a0b8', marginLeft: '8px' }}>大厂面试必备 · Java版</span>
                </div>
                <p style={{ color: '#a0a0b8', fontSize: '15px', maxWidth: '800px' }}>
                    专为零基础小白设计，从思路分析到代码实现，循循善诱带你掌握算法面试核心技巧。不是死记硬背，而是理解分析问题的思考过程。
                </p>
                <div style={{ position: 'absolute', top: '40px', right: '60px', fontSize: '14px', color: '#a0a0b8' }}>
                    ✨ 118 道精选题目
                </div>
            </header>

            {/* 学习路径 */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>学习路径</h2>
                <div className="learning-path">
                    <div className="path-step">
                        <div className="step-number step-1">1</div>
                        <div className="step-info">
                            <h4>理解题意</h4>
                            <p>分析问题本质</p>
                        </div>
                    </div>
                    <span className="path-arrow">→</span>
                    <div className="path-step">
                        <div className="step-number step-2">2</div>
                        <div className="step-info">
                            <h4>思路推导</h4>
                            <p>循循善诱引导</p>
                        </div>
                    </div>
                    <span className="path-arrow">→</span>
                    <div className="path-step">
                        <div className="step-number step-3">3</div>
                        <div className="step-info">
                            <h4>代码实现</h4>
                            <p>逐步构建代码</p>
                        </div>
                    </div>
                    <span className="path-arrow">→</span>
                    <div className="path-step">
                        <div className="step-number step-4">4</div>
                        <div className="step-info">
                            <h4>面试技巧</h4>
                            <p>掌握表达方法</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 题目类别选择 */}
            <section style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>▽</span>
                        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>选择题目类别</h2>
                        <span style={{ color: '#a0a0b8', fontSize: '14px' }}>已选 {selectedCategories.length} 类，共 {selectedProblemsCount} 题</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={selectAll} style={{ background: 'none', border: 'none', color: '#4ecdc4', cursor: 'pointer', fontSize: '14px' }}>全选</button>
                        <button onClick={clearAll} style={{ background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '14px' }}>✕ 清空</button>
                    </div>
                </div>

                <div className="category-grid">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`category-card ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                            onClick={() => toggleCategory(category.id)}
                            style={{ borderColor: selectedCategories.includes(category.id) ? category.color : undefined }}
                        >
                            {selectedCategories.includes(category.id) && (
                                <span style={{ color: category.color }}>✓</span>
                            )}
                            <span className="category-icon" style={{ color: category.color }}>{category.icon}</span>
                            <div className="category-info">
                                <div className="category-name">{category.name}</div>
                                <div className="category-count">{category.count} 题</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 题目列表 */}
            {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                const problems = getProblemsForCategory(categoryId);
                if (!category || problems.length === 0) return null;

                return (
                    <section key={categoryId} className="problem-list-section" style={{ marginBottom: '24px' }}>
                        <div className="problem-list-header">
                            <span className="problem-list-icon" style={{ color: category.color }}>{category.icon}</span>
                            <span className="problem-list-title" style={{ color: category.color }}>{category.name}</span>
                            <span className="problem-list-count">{problems.length} 道题目</span>
                        </div>
                        {problems.map((problem, index) => (
                            <div
                                key={problem.id}
                                className="problem-item"
                                onClick={() => onProblemSelect(problem, category, problems)}
                            >
                                <div className="problem-number">{String(index + 1).padStart(2, '0')}</div>
                                <div className="problem-info">
                                    <div className="problem-name">{problem.title}</div>
                                    <span className={`tag tag-${problem.difficulty}`}>
                                        {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                                    </span>
                                </div>
                                <span className="problem-arrow">›</span>
                            </div>
                        ))}
                    </section>
                );
            })}

            {/* 底部 */}
            <footer style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid #3a3a5c', display: 'flex', justifyContent: 'space-between', color: '#6b6b80', fontSize: '13px' }}>
                <span>{'>'}_  算法通关教程 · 专注大厂面试</span>
                <span>循循善诱 · 从思路到代码</span>
            </footer>
        </div>
    );
};

export default Home;
