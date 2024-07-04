"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./input.module.css"
import { parseClass } from "@/app/utils/parseClass";

export function Input(props) {
    const legend_placeholder = useRef(null);
    const placeholder = useRef(null);
    const [focused, changeFocused] = useState(false);
    const [empty, changeEmpty] = useState(props.value == undefined || props.value == "");
    const [width, setWidth] = useState(0);


    function sendValid(e){
        if (props.dataType == undefined){
            props.onchange(e.target.value);
        }else if(props.dataType == "number"){
            console.log(e);
            if (!isNaN(Number(e.target.value))){
                props.onchange(e.target.value);
            }else{
                e.preventDefault();
            }
        }else if(props.dataType == "mail"){
            
        }
    }

    useEffect(() => {
        setWidth(placeholder.current.clientWidth);
    });

    return <div style={{ width: props.width }} className={parseClass([styles.inputBox, [styles.inputBox_focused, focused], [styles.inputBox_empty, empty]])}>
        <fieldset className={styles.inputBox_field}>
            <legend style={{ width: ((focused || (!empty)) ? width : 0), marginLeft: `calc(0.5rem + ${width / 2}px)` }} ref={legend_placeholder} className={styles.inputBox_field_legend}>&nbsp;</legend>
            <div className={styles.inputBox_field_placeholder}> {props.placeholder} </div>
            <div ref={placeholder} className={styles.inputBox_placeholderSkeleton}>{props.placeholder}</div>
            <input value={props.value} onChange={(e) => { sendValid(e);changeEmpty(e.target.value == "") }} onBlur={() => changeFocused(false)} onFocus={() => changeFocused(true)} className={styles.inputBox_field_input} type="text" />
        </fieldset>

    </div>;
}

export function InputGroup({ children }) {
    return <div className={parseClass([styles.inputGroup, [styles.inputGroup_flex, true]])}>
        {children}
    </div>;
}

export function SelectBox({ options, placeholder, value, changeValue }) {
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
                        <div key={option.id} onClick={()=>{changeValue(option.id); changeEmpty(false); changeFocused(false)}} className={parseClass([styles.inputBox_field_list_option, [styles.inputBox_field_list_option_checked, value==option.id]])}>{option.label}</div>
                    ))
                }
            </div>
        </fieldset>

    </div>;
}