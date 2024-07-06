"use client";
import { useState } from "react";
import Button, { ButtonGroup } from "../ui/components/button";

import { Input, SelectBox, InputGroup } from "../ui/components/input"
import { ParseClass } from "../utils/parseClass";
import styles from "./styles.module.css"

const formData = { name: "", surname: "Petrov", age: 10, option: null }
const options = [{ id: 1, label: "First" }, { id: 2, label: "Second" }, { id: 3, label: "Third" }];
export default function Page() {
    const [data, updateData] = useState(formData);
    return <div className={styles.workspace}>
        <InputGroup>
            <Input value={data.name} onChange={(e) => updateData({ ...data, name: e.target.value })} placeholder={'Name'} />
            <Input value={data.surname} onChange={(e) => updateData({ ...data, surname: e.target.value })} placeholder={'Surname'} />
            <Input value={data.age} dataType="number" onChange={(e) => updateData({ ...data, age: e.target.value })} placeholder={'Age'} />
        </InputGroup>

        <InputGroup>
            
            <SelectBox value={data.option} onChange={(val) => updateData({ ...data, option: val })} placeholder={"Выберите что-нибудь"} options={options}></SelectBox>
            <Button large>Далее</Button>
        </InputGroup>
        <ButtonGroup>
            <Button onClick={(e)=>console.log(e.target)}>Test</Button>
            <Button secondary className={ ParseClass({
                "baby": true,
                "testy": true,
                "d": false
            }) }>Test 2</Button>
            <Button disabled={ (data.name + data.surname).length > 20 }>Test 3</Button>
        </ButtonGroup>


        {data.name} {data.surname} { data.option }
    </div>
}