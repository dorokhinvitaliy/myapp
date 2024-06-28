'use client';
import styles from './styles.module.css'
import { useState } from 'react'
export default function Form({ data }: { data: { name: string } }) {
    return <div>
        <TextInput placeholder={'UserName'} value={data.name}  />
        {data.name}
    </div>;
}

export function TextInput({ placeholder, value }: { placeholder: string, value: string }) {
    const [val, setVal] = useState(value)
    return <div className={styles.inputBox}>
        <div className={styles.inputBoxPlaceholder}>{placeholder}</div>
        <input type="text" value={val} onChange={e => { setVal(e.target.value) }} />
    </div>;
}