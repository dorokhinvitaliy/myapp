import React from "react";
import { CloseOutlineIcon } from "../icons";
import styles from "./modal.module.css"
import {parseClass} from "@/app/utils/parseClass";
export default function Modal({opened, changeOpened, options, children}:{opened:Boolean, changeOpened: any, options: {header: Boolean, title: String}, children: React.ReactNode}) {
    return <div className={parseClass([styles.modalArea, [styles.modalArea_closed, !opened]])}>
        <div className={styles.modalBackdrop} onClick={()=>(changeOpened(!opened))}>

        </div>
        <div className={styles.modalBlock}>
            { (options.header) && (<div className={styles.modalBlock_header}>
                <div className={styles.modalBlock_header_title}>
                    {options.title}
                </div>
                <div className={styles.modalBlock_header_close} >
                    <CloseOutlineIcon onClick={()=>(changeOpened(!opened))} />
                </div>

            </div>)}
            <div className={styles.modalBlock_body}>
                {children}
            </div>
        </div>
    </div>;
}