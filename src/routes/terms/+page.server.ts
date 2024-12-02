import { marked } from 'marked';
import fs from 'fs/promises';
let html: string | Promise<string>;

export const prerender = true;

export const load = async () => {
    try {
        const data = await fs.readFile('./static/markdown/terms.md');
        html = marked.options({}).parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error}`);
    }
    return {
        html
    };
};