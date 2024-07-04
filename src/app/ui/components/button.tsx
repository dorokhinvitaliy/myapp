import styles from "./button.module.css";
import {parseClass} from "@/app/utils/parseClass";
export default function Button(props){
    return <button className={ parseClass([styles.button, [styles.button_secondary, props.secondary], [styles.button_disabled, props.disabled], props.className]) }>{ props.children }</button>;
}

export function ButtonGroup({children}){
    return <div className={styles.buttons}>{children}</div>;
}
