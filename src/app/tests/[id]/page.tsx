'use client';
import test from "node:test";
import styles from "./styles.module.css"
import { act, useReducer, useState } from "react";

import CodeEditor from '@uiw/react-textarea-code-editor';
import { parse } from "path";

import SelectBox from "@/app/ui/tests/SelectBox";

const tasks = [
    {
        number: 1,
        title: "Задание 27",
        type: 'input',
        html: { __html: "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>" }
    },
    {
        number: 2,
        title: "Задание 27.2",
        type: 'check',
        html: { __html: "<p>Выберите все верные утверждения:</p>" },
        labels: [
            { id: 1, text: 'Все коты любят играть в косточки-нолики' },
            { id: 2, text: 'Все коты обожают есть новогодний дождик' },
            { id: 3, text: 'Коты - психопаты' },
            { id: 4, text: 'Коты живут дольше своих хозяев' },
            { id: 5, text: 'Коты ловят только привитых и здоровых мышей' }
        ]
    },
    {
        number: 3,
        title: "Задание 27.3",
        type: 'check',
        html: { __html: "<b>Bobr Dobr</b>" },
        labels: [
            { id: 1, text: 'Все коты любят играть в косточки-нолики' },
            { id: 2, text: 'Все коты обожают есть новогодний дождик' },
            { id: 3, text: 'Коты - психопаты' }
        ]
    },
    {
        number: 4,
        title: "Задание 27",
        type: 'check',
        html: { __html: "<b>Bobr Dobr</b>" },
        labels: [
            { id: 1, text: 'Все коты любят играть в косточки-нолики' },
            { id: 2, text: 'Все коты обожают есть новогодний дождик' },
            { id: 3, text: 'Коты - психопаты' }
        ]
    },
    {
        number: 5,
        title: "Задание X",
        type: 'code',
        html: { __html: "<p><strong>2Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>" }
    },
    {
        number: 6,
        title: "Задание XX",
        type: 'code',
        html: { __html: "<p>Напишите код, который решает задачу.</p>" }
    },

]

const initialAnswer = [
    {
        number: 1,
        content: "aboba",
        status: 'pending'
    },
    {
        number: 2,
        content: [2, 4],
        status: 'pending'
    },
    {
        number: 3,
        content: [],
        status: 'pending'
    },
    {
        number: 4,
        content: [],
        status: 'pending'
    },
    {
        number: 5,
        content: { lang: 'js', code: "function biba() {}", messages: [{ id: 1, type: 'info', text: '13 / 28 tests passed' }, { id: 2, type: 'error', text: 'TEST 14 Compiling Error' },] },
        status: 'pending'
    },
    {
        number: 6,
        content: { lang: 'python', code: "def boba(): \n", messages: [] },
        status: 'pending'
    }
];

export default function Page({ params }: { params: { id: string } }) {

    const [answer, dispatch] = useReducer(answerReducer, initialAnswer);
    const [answerSaved, dispatchSaved] = useReducer(answerSavedReducer, structuredClone(initialAnswer));
    const [current_task, current_task_update] = useState(tasks[0]);
    const status_vc = { "correct": "Верно", "incorrect": "Неверно", "partly": "Частично верно", "waiting": "Проверяется..." }

    /* function findAnswer(number: Number){
        const result = answer.find((a)=>a.number == number);
        if (result === undefined){
            return result;
        }else{
            return 0;
        }

    } */

    const code_langs = [
        { id: 'js', text: 'JavaScript' },
        { id: 'python', text: 'Python' },
        { id: 'cpp', text: 'C++' },
        { id: 'java', text: 'Java' }
    ];

    /* const [lang, updateLang] = useState('js'); */

    const [editorFocused, updateEditorFocused] = useState(false);

    function findTask(num: Number) {
        const result = (tasks.find(o => o.number == num));
        if (result == undefined) {
            return {
                number: 0,
                title: "--",
                type: 'code',
                html: {
                    __html: "<p>Not found.</p>"
                }
            };
        } else {
            return result;
        }
    }


    function compareWithPrev(a: { toString: () => any; code: any; lang: any; }, b: { toString: () => string; code: any; lang: any; }) {
        if (Array.isArray(a)) {
            return a.toString() == b.toString()
        } else if (typeof a == "object") {
            return (a.code == b.code) && (a.lang == b.lang)
        } else {
            return a == b
        }

    }

    function updateTask(number: Number) {
        dispatchSaved(structuredClone(answer.find((x) => x.number == number)));

    }

    function updateAnswerInput(text: string) {
        dispatch({
            number: current_task?.number,
            taskType: "input",
            text: text
        });
    }

    function updateAnswerCode(code: string) {
        dispatch({
            number: current_task?.number,
            taskType: "code",
            code: code
        });
    }

    function updateAnswerCodeLang(lang: string) {
        dispatch({
            number: current_task?.number,
            taskType: "codeLang",
            lang: lang
        });
    }



    function updateLabelChecked(id: Number, state: Boolean) {
        dispatch({
            number: current_task?.number,
            taskType: "check",
            id: id,
            state: state
        });
        console.log("CALLED");
    }

    return <div className={styles.workspace}>
        <div className={styles.tasksBar}>
            {tasks.map(task => (
                <div onClick={e => { current_task_update(findTask(task.number)) }} key={task.number} className={parseClass(
                    [
                        styles.tasksBar_cell,
                        [styles.tasksBar_cell_valid, (answer.find((a) => (a.number == task.number))).status == "correct"],
                        [styles.tasksBar_cell_invalid, (answer.find((a) => (a.number == task.number))).status == "incorrect"],
                        [styles.tasksBar_cell_partly, (answer.find((a) => (a.number == task.number))).status == "partly"],
                        [styles.tasksBar_cell_waiting, (answer.find((a) => (a.number == task.number))).status == "waiting"],
                        [styles.tasksBar_cell_active, task.number == current_task.number],

                    ])}>{task.number}</div>
            ))}
            <div className={parseClass([styles.tasksBar_cell, styles.tasksBar_cell_finish])}></div>
        </div>

        <div className={styles.taskArea}>
            <div className={styles.taskArea_header}>
                <div className={styles.taskArea_title}>{current_task?.title}</div>
                <div className={
                    parseClass([
                        styles.taskArea_status,
                        [styles.taskArea_status_correct, (answer.find((a) => a.number == current_task.number).status == "correct")],
                        [styles.taskArea_status_incorrect, (answer.find((a) => a.number == current_task.number).status == "incorrect")],
                        [styles.taskArea_status_partly, (answer.find((a) => a.number == current_task.number).status == "partly")],
                        [styles.taskArea_status_waiting, (answer.find((a) => a.number == current_task.number).status == "waiting")],
                    ])
                }> {status_vc[(answer.find((a) => a.number == current_task?.number).status)]} </div>
            </div>


            <div className={styles.taskArea_html} dangerouslySetInnerHTML={current_task.html}></div>




            {current_task.type == "input" && (
                <div className={styles.answerArea}>
                    <input key={current_task.number} defaultValue={(answer.find((a) => a.number == current_task?.number)).content} type="text" onInput={(e) => updateAnswerInput((e.target as HTMLInputElement).value)} className={styles.answerArea_input + ' ' + styles.answerArea_input_empty} />
                    <div className={styles.answerArea_placeholder}>Запишите ответ</div>
                </div>
            )}

            {current_task?.type == "check" && (
                <div className={styles.labelsArea}>
                    {current_task?.labels?.map((label) =>
                        <label key={"label/" + current_task.number + "/" + label.id} className={styles.answer_label}>
                            <input key={current_task.number + "/" + label.id} type="checkbox" onChange={(e) => { updateLabelChecked(label.id, e.target.checked) }} defaultChecked={answer.find((o) => o.number == current_task.number).content?.indexOf(label.id) != -1} className={styles.answer_label_check} />
                            <div className={styles.answer_label_text}>{label.text}</div>
                        </label>
                    )}
                </div>
            )}



            {current_task?.type == "code" && (
                <>
                    <div className={parseClass([styles.codeArea, [styles.codeArea_focused, editorFocused]])}>
                        <div className={styles.codeArea_placeholder}>Ваш код</div>
                        <div className={styles.codeArea_rightMenu}>
                            <SelectBox changeChecked={updateAnswerCodeLang} checked={(answer.find((a) => a.number == current_task?.number)).content.lang} labels={code_langs} />
                            {
                                (answer.find((a) => a.number == current_task?.number)).content.messages.map((msg) => (
                                    <div key={msg.id} className={parseClass([styles.codeArea_rightMenu_message, [styles.codeArea_rightMenu_message_red, msg.type == 'error']])}>{msg.text}</div>
                                ))
                            }
                        </div>

                        <CodeEditor
                            minHeight={200}
                            className={parseClass([
                                styles.codeArea_ws
                            ])}
                            value={(answer.find((a) => a.number == current_task?.number)).content.code}
                            language={(answer.find((a) => a.number == current_task?.number)).content.lang}
                            placeholder={`Please enter ${(answer.find((a) => a.number == current_task?.number)).content.lang} code.`}
                            onChange={(e) => updateAnswerCode(e.target.value)}
                            padding={15}
                            onFocus={() => updateEditorFocused(true)}
                            onBlur={() => updateEditorFocused(false)}

                        />
                        <div className={parseClass([styles.taskArea_buttons, styles.codeArea_buttons])}>
                            <button className={styles.button + " " + (compareWithPrev((answer[current_task?.number - 1].content), (answerSaved[current_task?.number - 1].content)) ? " " + styles.button_disabled : "")} onClick={(e) => updateTask(current_task?.number)}>{(compareWithPrev(answer[current_task?.number - 1].content, answerSaved[current_task?.number - 1].content) ? "Сохранено" : "Отправить на проверку")}</button>
                            <button className={styles.button + " " + styles.button_secondary}>Загрузить файл</button>
                        </div>
                    </div>
                </>
            )}



            {current_task?.type != "code" && (<div className={styles.taskArea_buttons}>
                <>
                    <button className={parseClass([styles.button, [styles.button_disabled, compareWithPrev((answer[current_task?.number - 1].content), (answerSaved[current_task?.number - 1].content))]])} onClick={(e) => updateTask(current_task?.number)}>{(compareWithPrev(answer[current_task?.number - 1].content, answerSaved[current_task?.number - 1].content) ? "Сохранено" : "Сохранить")}</button>
                    <button className={parseClass([styles.button, styles.button_secondary])}>Далее</button>
                </>

            </div>)}
        </div>
    </div>;
}

function answerReducer(answer, action) {

    switch (action.taskType) {
        case "input": {
            return answer.map((a) => {
                if (a.number == action.number) {
                    return { number: action.number, content: action.text }
                } else {
                    return a
                }
            });
            break;
        }
        case "check": {
            console.log("CHECKING", action);
            return answer.map((a) => {
                if (a.number == action.number) {
                    return { number: action.number, content: modifyList(a.content, action.id, action.state) }
                } else {
                    return a
                }
            });
            break;
        }
        case "code": {
            return answer.map((a) => {
                if (a.number == action.number) {
                    return { number: action.number, content: { lang: a.content.lang, code: action.code, messages: a.content.messages } }
                } else {
                    return a
                }
            });
            break;
        }
        case "codeLang": {
            return answer.map((a) => {
                if (a.number == action.number) {
                    console.log({ number: action.number, content: { lang: action.lang, code: a.code } });
                    return { number: action.number, content: { lang: action.lang, code: a.content.code, messages: a.content.messages } }
                } else {
                    return a
                }
            });
            break;
        }
    }

}

function answerSavedReducer(answerSaved, action) {
    return answerSaved.map((a) => {
        if (action.number == a.number) {
            return { number: action.number, content: action.content }
        } else {
            return a
        }
    });
}

function modifyList(list: Number[], element: Number, status: Boolean) {
    if (status) {
        if (!list.includes(element)) { list.push(element) }
    } else {
        delete list[list.indexOf(element)];
    }
    list = list.filter(Number);
    list.sort();

    console.log(list);
    return list;
}

/* export function SelectBox({ labels, checked, changeChecked }) {
 
    const [opened, upd_opened] = useState(false);
    return <div className={styles.selectBox + " " + (opened ? styles.selectBox_opened : "")}>
        <div className={styles.selectBox_selectArea} onClick={() => upd_opened(!opened)}>{(labels.find((o) => (o.id == checked))).text}</div>
        <div className={styles.selectOptions}>
            {labels.map((label) => (
                <div onClick={() => { changeChecked(label.id); upd_opened(!opened); }} className={styles.selectOption + " " + (label.id == checked && " " + styles.selectOptionChecked)} key={label.id}>{label.text}</div>
            ))}
        </div></div>;
} */

function parseClass(cls) {
    var result = "";
    for (var i = 0; i < cls.length; i += 1) {
        if (Array.isArray(cls[i])) {
            if (cls[i][1]) {
                result += cls[i][0] + " ";
            }
        } else {
            result += cls[i] + " ";
        }
    }
    return result;
}