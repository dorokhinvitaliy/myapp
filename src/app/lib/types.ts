export type Test = {
    id: string,
    title: string,
    progress: number
}

export type LabelAnswer = {
    id: number,
    text: string
}

export type Task = {
    id: string,
    number: number,
    title: string,
    type: string,
    html: {
        __html: string
    },
    labels: LabelAnswer[]
}

export type codeWarn = {
    id: number,
    type: 'info'|'error',
    text: string
}

export type Answer = {
    number: number,
    content: string | number[] | {lang: string, code: string, messages: codeWarn[]},
    status: "pending"|"correct"|"incorrect"|"partly"|"waiting"
}