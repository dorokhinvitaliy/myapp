'use client';
import styles from './styles.module.css'
import { useState } from 'react'


export default function Page() {
    const [vall, setVal] = useState('')
    const tests = [
        {
            title: 'Тест на котана',
            progress: 78, btn: true
        },
        {
            title: 'Тест на собакена',
            progress: 100, btn: false
        },
        {
            title: 'Тест на котика',
            progress: 85, btn: true
        },
        {
            title: 'Тест на котана',
            progress: 89, btn: true
        },
        {
            title: 'Тест на собакена',
            progress: 100, btn: false
        },
        {
            title: 'Тест на котика',
            progress: 85, btn: true
        }
    ]
    return <div className={styles.workspace}>
        <div className={styles.text}> Начните тест </div>
        <div className={styles.searchArea}>

            {/* <Doughnut
            options={{plugins:{width: 40, height: 40, legend:{display: false}, tooltip:{enabled: false}}}}
            data={{datasets: [{
                data: [75, 25],
                backgroundColor: [
                    '#0ABA07',
                    'rgba(10, 186, 7, 0.07)'
                  ],
                borderColor: 'transparent'
            }]}}/> */}
            <input value={vall} onChange={e => { setVal(e.target.value) }} type="text" className={styles.searchArea_input + ' ' + (vall == '' ? styles.searchArea_input_empty : '')} />
            <div className={styles.searchArea_placeholder}>id теста</div>
            <button className={styles.searchArea_button + ' ' + (vall == '' ? styles.searchArea_button_disabled : '')}>Далее</button>
        </div>
        <div className={styles.text}> Пройденные тесты </div>
        <div className={styles.testBlocks}>
            {tests.map(test =>
                <div className={styles.testBlock}>
                    <div className={styles.testBlock_united}>
                        <div className={styles.testBlock_icon}>
                            {(test.progress == 100) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.99 172.99" width="80" height="80">
                                    <circle style={{ fill: "#0aba07", fillOpacity: 0.28 }} cx="86.49" cy="86.49" r="76.49" />
                                    <circle style={{ fill: "#0aba07", fillOpacity: 0.33 }} cx="86.49" cy="86.49" r="57.01" />
                                    <circle style={{ fill: "#0aba07" }} cx="86.49" cy="86.49" r="39.32" />
                                    <path style={{ fill: "none", stroke: "#fff", strokeWidth: "5.9px" }} d="M84.27,100.34l11.09,11.45,20.37-23.58" transform="translate(-13.51 -13.51)" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="80" height="80">
                                <circle style={{ fill: "transparent", strokeWidth: 15, stroke: "#0ABA07", strokeDasharray: "calc(2*pi*50)", strokeDashoffset: `calc(2*pi*50*${(100 - test.progress) / 100})` }} cx="90" cy="90" r="50"></circle>
                                <circle style={{ fill: "transparent", strokeWidth: 15, stroke: "rgba(10, 186, 7, 0.07)" }} cx="90" cy="90" r="50"></circle>
                            </svg>
                            )}
                            

                        </div>
                        <div className={styles.testBlock_content}>
                            <div className={styles.testBlock_content_title}>{test.title}</div>
                            <div className={styles.testBlock_content_secondary}> <span style={{ color: 'green' }}>{test.progress}%</span> пройдено</div>
                        </div>
                    </div>
                    { test.btn ? <button className={styles.testBlock_button + ' ' + styles.button}>Пройти</button> : ''}
                </div>)}

        </div>
        {/* <button className={styles.button}>Далее</button> */}
    </div>;
}