# Hi there

This personal ChatGPT CLI tool uses the OpenAI API to generate text and run functions. The app runs in the terminal.

## Configuration
1. Add your OpenAI API Key to your shell environment as `OPENAI_API_KEY=your_key_here`
2. Install the dependencies with `pnpm i`
3. Run the app with `pnpm run dev`

## Installation as a global CLI tool
1. Install the app globally with `pnpm add -g`
2. Run the app with `gpt`

## Updating
1. Make your changes
2. Run `pnpm run build` to build the app
3. Run `pnpm add -g` to update the global CLI tool

## Future plans
- Make it generate files in the working directory (for example, React components with css modules, storybook stories, tests, etc.)