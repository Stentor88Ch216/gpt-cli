#!/usr/bin/env node
import OpenAI from 'openai';
import * as readline from 'readline';
import chalk from 'chalk';



const openai = new OpenAI(); // Uses OPENAI_API_KEY from .zshrc
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    //terminal: false
});

async function main() {

    console.clear();
    process.stdout.write('GPT-CLI\n');
    process.stdout.write(chalk.dim.italic('Thomas DOUCHE 2023\n'));
    process.stdout.write(chalk.dim.italic('Type "quit" to exit\n\n'));

    const conv: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];


    async function askPrompt() {
        rl.question(chalk.blue.bold('Tom\n'), async (prompt) => {

            if (prompt.length === 0) {
                process.stdout.write(chalk.dim.italic('Please enter a prompt\n\n'));
                askPrompt();
                return;
            }

            if (prompt.toLocaleLowerCase() === 'quit') {
                rl.close();
                return;
            }

            conv.push({role: 'user', content: prompt});

            const params: OpenAI.Chat.ChatCompletionCreateParams = {
                model: 'gpt-4-1106-preview',
                messages: conv,
                stream: true,
            };
        
            const stream = await openai.chat.completions.create(params);
        
            process.stdout.write('\n' + chalk.green.bold('GPT\n'));
            let answer = '';
            for await (const chunk of stream) {
                const chunkText = chunk.choices[0]?.delta?.content || '';
                process.stdout.write(chunkText);
                answer += chunkText;
            }
            conv.push({role: 'assistant', content: answer});

            process.stdout.write('\n\n');
            askPrompt();
        });
    }

    askPrompt();

    rl.on('close', () => {
        process.stdout.write(chalk.dim.italic('\nBye!\n'));
        process.exit(0);
    });
}

main();