import inquirer, { Answers, Question, DistinctQuestion } from "inquirer";

export default async function ask(questions: Question[]): Promise<Answers> {
    try {
        return await inquirer.prompt(questions as DistinctQuestion[]);
    } catch (error) {
        throw error;
    }
}