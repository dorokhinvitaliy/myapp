"use client";
import { useReducer, useState } from "react";
import Button, { ButtonGroup } from "../ui/components/button";

import { Input, SelectBox, InputGroup } from "../ui/components/input"
import styles from "./styles.module.css"

const formData = { name: "Vanya", surname: "Petrov", age: 10, option: null }
const options = [{ id: 1, label: "First" }, { id: 2, label: "Second" }, { id: 3, label: "Third" }];
export default function Page() {
    const [data, updateData] = useState(formData);
    return <div className={styles.workspace}>
        <InputGroup>
            <Input value={data.name} onchange={(val) => updateData({ ...data, name: val })} width="100%" placeholder={'Name'} />
            <Input value={data.surname} onchange={(val) => updateData({ ...data, surname: val })} width="100%" placeholder={'Surname'} />
            <Input value={data.age} dataType="number" onchange={(val) => updateData({ ...data, age: val })} width="100%" placeholder={'Age'} />
        </InputGroup>

        <InputGroup>
            <Input pattern={"N-N-N-N"} placeholder={'SpecialCode'} />
            <SelectBox value={data.option} changeValue={(val) => updateData({ ...data, option: val })} placeholder={"Выберите что-нибудь"} options={options}></SelectBox>
            <Button>Далее</Button>
        </InputGroup>
        <ButtonGroup>
            <Button>Test</Button>
            <Button secondary>Test 2</Button>
            <Button disabled>Test 3</Button>
        </ButtonGroup>


        {data.name} {data.surname}
    </div>
}