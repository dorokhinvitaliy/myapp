'use client';

import { useState } from "react";
import Form from "./form"
const someData = {
    inp: 'value'
};

export default function Page() {
    const [x,setX] = useState('')
    return <>
        <div>TEST PAGE</div>
        <div>{ x }</div>
        <input type="text" value={x} onChange={e => {
            setX(e.target.value);
        }} />
        <Form data={ {name: "Vova"} } />
    </>;
}