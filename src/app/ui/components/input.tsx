"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./input.module.css"
import { parseClass } from "@/app/utils/parseClass";

export function Input({placeholder, dataType, onChange, value, className, status, ...props}: {placeholder: string, dataType?: string, onChange: any, status?: "valid"|"invalid", value: any, className?: any}) {
    const legend_placeholder = useRef(null);
    const placeholder_ck = useRef(null);
    const [focused, changeFocused] = useState(false);
    const [empty, changeEmpty] = useState(value == undefined || value == "");
    const [width, setWidth] = useState(0);
    const [onLoadAppear, onLoadAppearUpd] = useState(true);


    function sendValid(e){
        if (dataType == undefined){
            onChange(e);
        }else if(dataType == "number"){
            console.log(e);
            if (!isNaN(Number(e.target.value))){
                onChange(e);
            }else{
                e.preventDefault();
            }
        }else if(dataType == "mail"){
            
        }
    }

    useEffect(() => {
        setWidth(placeholder_ck.current.clientWidth);
        setTimeout(()=>{ onLoadAppearUpd(false) } ,1000);
    });

    return <div className={parseClass([styles.inputBox, [styles.inputBox_focused, focused], [styles.inputBox_empty, empty], [styles.inputBox_valid, status=="valid"]])}>
        <fieldset className={styles.inputBox_field}>
            <legend style={{ width: ((focused || (!empty)) ? width : 0), marginLeft: `calc(0.5rem + ${width / 2}px)` }} ref={legend_placeholder} className={parseClass([styles.inputBox_field_legend])}>&nbsp;</legend>
            <div className={parseClass([styles.inputBox_field_placeholder, [styles.appear_animation_delay, onLoadAppear]])}>{placeholder}</div>
            <div ref={placeholder_ck} className={styles.inputBox_placeholderSkeleton}>{placeholder}</div>
            <input value={value} onChange={(e) => { sendValid(e);changeEmpty(e.target.value == "") }} onBlur={() => changeFocused(false)} onFocus={() => changeFocused(true)} className={parseClass([styles.inputBox_field_input, className || ""])} type="text" { ...props} />
        </fieldset>

    </div>;
}

export function InputGroup({ children }) {
    return <div className={parseClass([styles.inputGroup, [styles.inputGroup_flex, true]])}>
        {children}
    </div>;
}

export function SelectBox({ options, placeholder, value, onChange }) {
    const placeholder_sk = useRef<HTMLInputElement>(null);
    const [focused, changeFocused] = useState(false);
    const [empty, changeEmpty] = useState(value == null);
    const [width, setWidth] = useState(0);

    function updateWidth() {
        setWidth(placeholder_sk.current.clientWidth);
    }

    useEffect(() => {
        updateWidth();
    });

    return <div className={parseClass([styles.inputBox, styles.selectBox, [styles.inputBox_focused, focused], [styles.inputBox_empty, empty]])}>
        <fieldset className={styles.inputBox_field}>
            <legend style={{ width: ((focused || (!empty)) ? width : 0), marginLeft: `calc(0.5rem + ${width / 2}px)` }} className={styles.inputBox_field_legend}>&nbsp;</legend>
            <div className={styles.inputBox_field_placeholder}> {placeholder} </div>
            <div ref={placeholder_sk} className={styles.inputBox_placeholderSkeleton}>{placeholder}</div>
            <div onClick={()=>changeFocused(!focused)} className={styles.inputBox_field_input}>{ value == null ? (<>&nbsp;</>) : (options.find((o)=>o.id==value).label) }</div>
            <div className={styles.inputBox_field_list}>
                {
                    options.map((option) => (
                        <div key={option.id} onClick={()=>{onChange(option.id); changeEmpty(false); changeFocused(false)}} className={parseClass([styles.inputBox_field_list_option, [styles.inputBox_field_list_option_checked, value==option.id]])}>{option.label}</div>
                    ))
                }
            </div>
        </fieldset>

    </div>;
}