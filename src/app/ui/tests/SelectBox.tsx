import { useState } from "react";
import styles from "@/app/tests/[id]/styles.module.css"
export default function SelectBox({ labels, checked, changeChecked }) {

    const [opened, upd_opened] = useState(false);
    return <div className={styles.selectBox + " " + (opened ? styles.selectBox_opened : "")}>
        <div className={styles.selectBox_selectArea} onClick={() => upd_opened(!opened)}>{(labels.find((o) => (o.id == checked))).text}</div>
        <div className={styles.selectOptions}>
            {labels.map((label) => (
                <div onClick={() => { changeChecked(label.id); upd_opened(!opened); }} className={styles.selectOption + " " + (label.id == checked && " " + styles.selectOptionChecked)} key={label.id}>{label.text}</div>
            ))}
        </div></div>;
}