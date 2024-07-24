import { parseClass } from "@/app/utils/parseClass";
import React, { useEffect } from "react";
import styles from "./CustomTable.module.css";
export default function CustomTable({ children, aspectRatio }) {
    return <div className={styles.customTable}>
        {children.map((child, i) => {
            return React.cloneElement(child, {
                aspectRatio: aspectRatio,
                key: i
            })
        })}
    </div>;
}
export function CustomTableHeader({ children, aspectRatio = [] }: { children: any, aspectRatio?: Number[] }) {
    return <div className={styles.customTableHeader}>
        {
            React.cloneElement(children, {
                aspectRatio: aspectRatio
            })
        }
    </div>;
}
export function CustomTableBody({ children, aspectRatio = [] }: { children: any, aspectRatio?: Number[] }) {
    return <div className={styles.customTableBody}>
        {children.map((child, i) => {
            return React.cloneElement(child, {
                aspectRatio: aspectRatio,
                key: i
            })
        })}
    </div>;
}
export function CustomTableRow({ children, aspectRatio = [] }: { children: any, aspectRatio?: Number[] }) {
    function sum(array) {
        var result = 0
        for (var i = 0; i < array.length; i++) {
            result += array[i]
        }
        return result;
    }
    return <div className={styles.customTableRow}>
        {children.map((child, i) => {
            return React.cloneElement(child, {
                width: (Number(aspectRatio[i]) / Number(sum(aspectRatio)) * 100),
                key: i
            })
        })}
    </div>;
}
export function CustomTableCell({ children, width = 0, style=null, centered=false, ...props }) {
    return <div className={parseClass([styles.customTableCell, [styles.customTableCell_centered, centered]])} style={{...style, width: `${width}%` }} {...props}>
        {children}
    </div>;
}