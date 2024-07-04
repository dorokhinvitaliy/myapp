'use client';
import styles from './styles.module.css'
import { useState } from 'react'

import {parseClass} from "@/app/utils/parseClass";

export default function Page() {
    const [vall, setVal] = useState('')
    const tests = [
        {
            id: 1,
            title: 'Тест на котана',
            btn: true,
            progress: -1,
            hidden: true
        },
        {
            id: 2,
            title: 'Тест на собакена',
            progress: 100,
            btn: false
        },
        {
            id: 3,
            title: 'Тест на котика',
            progress: 85,
            btn: true
        },
        {
            id: 4,
            title: 'Тест на котана',
            progress: 89,
            btn: true
        },
        {
            id: 5,
            title: 'Тест на собакена',
            progress: 100,
            btn: false
        },
        {
            id: 6,
            title: 'Тест на котика',
            progress: 85,
            btn: true
        }
    ]
    return <div className={styles.workspace}>
        <div className={styles.text}> Начните тест </div>
        <div className={styles.searchArea}>
            <input value={vall} onChange={e => { setVal(e.target.value) }} type="text" className={styles.searchArea_input + ' ' + (vall == '' ? styles.searchArea_input_empty : '')} />
            <div className={styles.searchArea_placeholder}>id теста</div>
            <button className={styles.searchArea_button + ' ' + (vall == '' ? styles.searchArea_button_disabled : '')}>Далее</button>
            {
                vall=="aboba234" && (<div className={styles.searchArea_message}>Такого теста не существует</div>)
            }
        </div>
        <div className={styles.text}> Пройденные тесты </div>
        <div className={styles.testBlocks}>
            {tests.map(test =>
                <div key={"tests/test/" + test.id} className={styles.testBlock}>
                    <div className={styles.testBlock_united}>
                        <div className={styles.testBlock_icon}>
                            <ProgressBar progress={test.progress}/>
                        </div>
                        <div className={styles.testBlock_content}>
                            <div className={styles.testBlock_content_title}>{test.title}</div>
                            {test.progress == -1 ? (<div style={{color: "#9c9c9c"}} className={styles.testBlock_content_secondary}>Ожидает проверки</div>) : (<div className={styles.testBlock_content_secondary}> <span style={{ color: 'green' }}>{test.progress}%</span> пройдено</div>)}
                        </div>
                    </div>
                    {test.btn ? <button className={parseClass([styles.testBlock_button, styles.button, [styles.button_disabled, test.progress==-1]])}>Смотреть</button> : ''}
                </div>)}

        </div>
        {/* <button className={styles.button}>Далее</button> */}
    </div>;
}

function ProgressBar({ progress }: { progress: Number }) {
    if (progress == -1) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.99 172.99" width="80" height="80">
                <circle className={ parseClass([styles.cls, styles.cls1]) } style={{ fill: "#9c9c9c", fillOpacity: 0.28 }} cx="86.49" cy="86.49" r="76.49" />
                <circle className={ parseClass([styles.cls, styles.cls2]) } style={{ fill: "#9c9c9c", fillOpacity: 0.33 }} cx="86.49" cy="86.49" r="57.01" />
                <circle className={ parseClass([styles.cls, styles.cls3]) } style={{ fill: "#9c9c9c" }} cx="86.49" cy="86.49" r="39.32" />
            </svg>
        );
    } else if (progress == 100) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.99 172.99" width="80" height="80">
                <circle className={ parseClass([styles.cls, styles.cls1]) } style={{ fill: "#0aba07", fillOpacity: 0.28 }} cx="86.49" cy="86.49" r="76.49" />
                <circle className={ parseClass([styles.cls, styles.cls2]) } style={{ fill: "#0aba07", fillOpacity: 0.33 }} cx="86.49" cy="86.49" r="57.01" />
                <circle className={ parseClass([styles.cls, styles.cls3]) } style={{ fill: "#0aba07" }} cx="86.49" cy="86.49" r="39.32" />
                <path className={ parseClass([styles.pls]) } style={{ fill: "none", stroke: "#fff", strokeWidth: "5.9px" }} d="M84.27,100.34l11.09,11.45,20.37-23.58" transform="translate(-13.51 -13.51)" />
            </svg>
        );
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="80" height="80">
                <circle className={styles.circle} style={{ fill: "transparent", strokeWidth: 15, stroke: "#0ABA07", strokeDasharray: "calc(2*pi*50)", strokeDashoffset: `calc(2*pi*50*${(100 - +progress) / 100})` }} cx="90" cy="90" r="50"></circle>
                <circle style={{ fill: "transparent", strokeWidth: 15, stroke: "rgba(10, 186, 7, 0.07)" }} cx="90" cy="90" r="50"></circle>
            </svg>
        );
    }
}