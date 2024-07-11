import React, { useEffect, useState } from "react";
import { CloseOutlineIcon } from "../icons";
import styles from "./modal.module.css"
import { parseClass } from "@/app/utils/parseClass";
export default function Modal({ opened, changeOpened, options, closeRef, children }: { opened: Boolean, changeOpened: any, options: { header: Boolean, title?: String }, closeRef?: any, children: React.ReactNode }) {
    const [closing, updateClosing] = useState(false);
    function startClosing() {
        updateClosing(true);
    }
    useEffect(()=>{
        setTimeout(()=>(closeRef?.current?.addEventListener("click", ()=>{
            startClosing();
        })), 100);
    }, []);
    function endClosing() {
        changeOpened(false); updateClosing(false);
    }
    return opened && (<div className={parseClass([styles.modalArea, [styles.modalArea_closed, closing]])} onAnimationEnd={() => { if (closing) endClosing() }}>
        <div className={styles.modalBackdrop} onClick={() => (startClosing())}>

        </div>
        <div className={styles.modalBlock}>
            {(options.header) && (<div className={styles.modalBlock_header}>
                <div className={styles.modalBlock_header_title}>
                    {options.title}
                </div>
                <div className={styles.modalBlock_header_close} >
                    <CloseOutlineIcon onClick={() => (startClosing())} />
                </div>

            </div>)}
            <div className={styles.modalBlock_body}>
                {children}
            </div>
        </div>
    </div>);
}

export function ModalExit() {
    return <div></div>
}