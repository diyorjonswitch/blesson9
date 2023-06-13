import { writeFileSync } from "fs";

export const writeFileCustom = (path, data) => {
    writeFileSync(`./src/data/${path}` ,JSON.stringify(data, null, 4))
    return "Succesfully inserted"
}