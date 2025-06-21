import inquirer, { Answers } from "inquirer";


export type tInquire = {
    type: "list" | "input";
    name: string;
    message: string;
    default ?: string;
    choices?: string[];
}



export default async function ask(questions:tInquire[]):Promise<Answers>{
    return await inquirer.prompt(
        questions.map(eachQues => {
            const { choices, ...rest } = eachQues;
            return {
                ...rest,
                ...(choices ? { choices } : {})
            };
        })
    );
}