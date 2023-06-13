import { readFileSync } from "fs";

export const readfileCustom = path => JSON.parse(readFileSync(`./src/data/${path}`, 'utf-8'))