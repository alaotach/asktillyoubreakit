export interface Question {
    id: string;
    text: string;
    options: string[];
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    context?: string;
    correctAnswer?: string;
}

export interface Answer {
    questionId: string;
    questionText: string;
    userAnswer: string;
    timestamp: Date;
    topic: string;
}

export interface UserSession {
    id: string;
    topic: string;
    answers: Answer[];
    startTime: Date;
}