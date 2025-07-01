import { Question, Answer } from '@/types';

const api = "https://asktillyoubreak.dotverse.tech";

export async function genQuestion(topic: string, previousAnswers: Answer[], count: number = 30): Promise<Question[]> {
    try {
        const resp = await fetch(`${api}/questions/generate`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, previousAnswers, count })
        });
        if (!resp.ok) {
            throw new Error('Failed to generate questions');
        }
        const data = await resp.json();
        return data.questions;
    } catch (error) {
        console.error(error);
        return [];
    }
}