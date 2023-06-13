import fs from 'fs'
import { createServer } from 'http'
import { readfileCustom, writeFileCustom } from './helpers/index.js'

const server = createServer((req, res) => {
    const method = req.method

    if (method == 'GET') {
        const books = fs.readFileSync('./src/data/book.json', 'utf-8')
        const data = JSON.parse(books)
        res.writeHead(200, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(data))
        return
    }
    if (method == 'POST') {
        req.on('data', chunk => {
            const body = JSON.parse(chunk)
            const books = readfileCustom('book.json')
            books.push({
                id: books.at(-1)?.id + 1 || 1,
                ...body
            })
            fs.writeFileSync('./src/data/book.json', JSON.stringify(books, null, 4))
        })
        res.end("ok from main block")


    }
    if (method == 'PATCH') {
        const bookId = req.url.split('/')[1]

        req.on('data', chunk => {
            const body = JSON.parse(chunk)

            const allbooks = readfileCustom('book.json')
            const book = allbooks.find(e => e.id == bookId)

            book.title = body.title

            const bookIndex = allbooks.findIndex(e => e.id == bookId)
            allbooks.splice(bookIndex, 1)

            allbooks.push(book)

            fs.writeFileSync('./src/data/book.json', JSON.stringify(allbooks, null, 4))
        })

        res.end("ok from main block")



    }
    if (method == 'DELETE') {
        const bookId = req.url.split('/')[1]

        const allbooks = readfileCustom('book.json')

        const bookIndex = allbooks.findIndex(e => e.id == bookId)
        allbooks.splice(bookIndex, 1)

       writeFileCustom('book.json', allbooks)

        res.end("Ok from main block")
    }
})
server.listen(9000, console.log("listening..."))