
export interface ThinkingStep {
    title: string;
    question?: string;
    hint?: string;
    answer?: string;
    content?: string;
}

export interface CodeStep {
    title: string;
    code: string;
    explanation: string;
}

export interface Problem {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    description: string;
    examples: { input: string; output: string; explanation?: string }[];
    timeComplexity: string;
    timeExplanation: string;
    spaceComplexity: string;
    spaceExplanation: string;
    thinkingGuide: ThinkingStep[];
    codeImplementation: CodeStep[];
    fullCode: string;
    interviewTips: {
        keyPoints: string[];
        template: string[];
    };
    summary: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    count: number;
}
