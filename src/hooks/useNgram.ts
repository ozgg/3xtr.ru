import {useState} from "react";

type hook = [object, (input: string) => void, (data?: object) => string]

export default function useNgram(n: number = 6): hook {
    if (typeof n !== 'number' || Number.isNaN(n) || n < 1 || n > 10) {
        throw new Error('`' + n + '` is not a valid argument for `useNgram`')
    }

    const [data, setData] = useState({})

    const feed = (input: string) => {
        const list: string[] = []
        let index = input.length - n + 1

        if (index < 1) {
            return
        }

        while (index--) {
            list[index] = input.slice(index, index + n)
        }

        setData(prev => {
            const data = {...prev}
            for (let gram of list) {
                data[gram] = data.hasOwnProperty(gram) ? data[gram] + 1 : 1
            }

            return data
        })
    }

    const sample = (data1: object, start: string): string => {
        const buffer = {}

        Object.entries(data).forEach(pair => {
            if (pair[0].slice(0, n - 1) === start.slice(0, n - 1)) {
                buffer[pair[0]] = pair[1]
            }
        })

        const table = Object.entries(buffer).flatMap(([g, w]: [string, number]) => Array(w).fill(g))

        return table[Math.floor(Math.random() * table.length)] ?? ''
    }

    const build = (data1?: object): string => {
        let result = ''
        let chunk = Array(n).fill(' ').join('')
        let indicator = Array(n - 1).fill(' ').join('')
        let done = false
        let steps = 0

        do {
            chunk = sample(data, chunk.slice(1))
            result += chunk.slice(-1)
            done = (++steps > 1000) || (chunk.slice(-(n - 1)) === indicator)
        } while (!done)

        return result.trim()
    }

    return [data, feed, build]
}
