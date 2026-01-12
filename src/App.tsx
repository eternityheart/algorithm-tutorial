import React, { useState } from 'react';
import Home from './components/pages/Home';
import ProblemPage from './components/pages/ProblemPage';
import { problemsData, Problem, Category } from './data/problemsData';

export type { Problem, Category };
export { problemsData };

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'home' | 'problem'>('home');
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryProblems, setCategoryProblems] = useState<Problem[]>([]);

    const handleProblemSelect = (problem: Problem, category: Category, problems: Problem[]) => {
        setSelectedProblem(problem);
        setSelectedCategory(category);
        setCategoryProblems(problems);
        setCurrentPage('problem');
    };

    const handleBack = () => {
        setCurrentPage('home');
    };

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (!selectedProblem || categoryProblems.length === 0) return;

        const currentIndex = categoryProblems.findIndex(p => p.id === selectedProblem.id);
        let newIndex: number;

        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : categoryProblems.length - 1;
        } else {
            newIndex = currentIndex < categoryProblems.length - 1 ? currentIndex + 1 : 0;
        }

        setSelectedProblem(categoryProblems[newIndex]);
    };

    const getCurrentProblemIndex = () => {
        if (!selectedProblem || categoryProblems.length === 0) return 0;
        return categoryProblems.findIndex(p => p.id === selectedProblem.id) + 1;
    };

    return (
        <div className="app">
            {currentPage === 'home' ? (
                <Home onProblemSelect={handleProblemSelect} />
            ) : (
                <ProblemPage
                    problem={selectedProblem!}
                    category={selectedCategory!}
                    currentIndex={getCurrentProblemIndex()}
                    totalCount={categoryProblems.length}
                    onBack={handleBack}
                    onNavigate={handleNavigate}
                />
            )}
        </div>
    );
};

export default App;
