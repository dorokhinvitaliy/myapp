import styles from "./button.module.css";
import {ParseClass, parseClass} from "@/app/utils/parseClass";
export default function Button({secondary, disabled, large, className, children, ...props}:{secondary?:any, disabled?: any, large?: any, className?: any, children: any, props?: any}){
    return <button className={ parseClass([styles.button, [styles.button_secondary, secondary], [styles.button_large, large], [styles.button_disabled, disabled], className||""]) } {...props}>{ children }</button>;
}

export function ButtonGroup({children, className, ...props}:{children: any, className?: any }){
    return <div className={parseClass([styles.buttons, className])} {...props}>{children}</div>;
}
