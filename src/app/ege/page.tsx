"use client";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Input, InputGroup, SelectBox } from "../ui/components/input";

import Button, { ButtonGroup } from "../ui/components/button";
import { parseClass } from "../utils/parseClass";
const preData = {
    snils: "188-291-227 05",
    available_v: [
        { id: 1, label: "ВШЭ" }
    ],
    selected_v: null,
    available_p: [
        { id: 1, label: "Бизнес-информатика" },
        { id: 2, label: "Прикладная математика и ифнорматика" },
        { id: 3, label: "Программная инженерия" },
        { id: 4, label: "Информатика и вычислительная техника" }
    ],
    selected_p: null
}
import axios from 'axios';

export default function Page() {
    const [loading, changeLoading] = useState();
    const [rows, updRows] = useState(null);
    const [data, updData] = useState(preData);
    function loadInfo() {
        const apiUrl = 'http://127.0.0.1:5000/ege';
        axios.get(apiUrl).then((resp) => {
            const rows_t = resp.data;
            updRows(rows_t);
        });
    }

    const [validForm, validFormUpd] = useState(false);
    function is_valid() {
        if (data.snils == "") return false
        if (data.selected_v === null) return false
        if (data.selected_p === null) return false
        return true
    }
    useEffect(() => {
        validFormUpd(is_valid());
    }, [data]);
    return <div className={styles.workspace}>
        <ContentBlock>
            <H>Поиск</H>
            <InputGroup>
                <Input value={data.snils} onChange={(e) => (updData({ ...data, snils: e.target.value }))} placeholder={"СНИЛС"} />
            </InputGroup>
            <InputGroup>
                <SelectBox value={data.selected_v} onChange={(v) => (updData({ ...data, selected_v: v }))} placeholder={"ВУЗ"} options={data.available_v}></SelectBox>
                <SelectBox value={data.selected_p} onChange={(v) => (updData({ ...data, selected_p: v }))} placeholder={"Направление подготовки"} options={data.available_p}></SelectBox>
            </InputGroup>
            <ButtonGroup>
                <Button disabled={!validForm} onClick={() => (loadInfo())}>Сформировать</Button>

                {rows !== null &&
                    (<Button secondary>Обновить данные</Button>)
                }
            </ButtonGroup>

        </ContentBlock>
        
        <TraectoryInfo rows={rows} />
        <UserInfo rows={rows} snils={data.snils} />
        <Table rows={rows} snils={data.snils} />

    </div>;
}

export function ContentBlock({ children }: { children?: React.ReactNode }) {
    return <div className={styles.contentBlock}>
        {children}
    </div>;
}

export function H({ children }: { children?: React.ReactNode }) {
    return <p className={styles.contentHeader}>{children}</p>
}

export function Table({ rows, snils }) {
    if (rows == null) {
        return <></>;
    }
    function shortSnils(str) {
        return "..." + str.slice(10);
    }
    return <ContentBlock><table className={styles.table}>
        <thead className={styles.stickyHeader}>
            <tr>
                <th className={styles.table_th} rowSpan={2}>№</th>
                <th className={styles.table_th} rowSpan={2}>СНИЛС</th>
                <th className={styles.table_th} rowSpan={2}>Особые права</th>

                <th className={styles.table_th} colSpan={4}>Баллы ЕГЭ</th>
                <th className={styles.table_th} rowSpan={2}>Оригинал аттестата</th>
                <th className={styles.table_th} rowSpan={2}>Приоритет</th>
            </tr>
            <tr>

                <th className={styles.table_th} >Мат-ка</th>
                <th className={styles.table_th} >Русс.язык</th>
                <th className={styles.table_th} >Инф-ка</th>
                <th className={styles.table_th} >Сумм.</th>
            </tr>
        </thead>
        <tbody>
            <tr><td className={styles.table_td} colSpan={9}><b>БВИ</b></td></tr>
            {
                rows.reit[0].map((row) => (
                    <tr key={row.id} className={parseClass([[styles.selectedRow, row.snils == snils], [styles.redLine, row.number == rows.b]])}>
                        <td className={styles.table_td} >{row.number}</td>
                        <td className={styles.table_td}>{shortSnils(row.snils)}</td>
                        <td className={parseClass([styles.table_td, [styles.greenCell, row.bvi == "Да"]])}>БВИ</td>
                        <td className={styles.table_td}>{row.math}</td>
                        <td className={styles.table_td}>{row.russian}</td>
                        <td className={styles.table_td}>{row.informatics}</td>
                        <td className={styles.table_td}>{row.summ}</td>
                        <td className={styles.table_td}>{row.orig}</td>
                        <td className={styles.table_td}>{row.prioritet_inoe}</td>
                    </tr>
                ))
            }
            <tr><td className={styles.table_td} colSpan={9}><b>Квота</b></td></tr>
            {
                rows.reit[1].map((row) => (
                    <tr key={row.id} className={parseClass([[styles.selectedRow, row.snils == snils], [styles.redLine, row.number == rows.b]])}>
                        <td className={styles.table_td} >{row.number}</td>
                        <td className={styles.table_td}>{shortSnils(row.snils)}</td>
                        <td className={parseClass([styles.table_td, [styles.greyCell, row.kvota]])}>{row.kvota}</td>
                        <td className={styles.table_td}>{row.math}</td>
                        <td className={styles.table_td}>{row.russian}</td>
                        <td className={styles.table_td}>{row.informatics}</td>
                        <td className={styles.table_td}>{row.summ}</td>
                        <td className={styles.table_td}>{row.orig}</td>
                        <td className={styles.table_td}>{row.prioritet_inoe}</td>
                    </tr>
                ))
            }
            <tr><td className={styles.table_td} colSpan={9}><b>Бюджетные места</b></td></tr>
            {
                rows.reit[2].map((row) => (
                    <tr key={row.id} className={parseClass([[styles.selectedRow, row.snils == snils], [styles.redLine, row.number == rows.b]])}>
                        <td className={styles.table_td} >{row.number}</td>
                        <td className={styles.table_td}>{shortSnils(row.snils)}</td>
                        <td className={parseClass([styles.table_td])}></td>
                        <td className={styles.table_td}>{row.math}</td>
                        <td className={styles.table_td}>{row.russian}</td>
                        <td className={styles.table_td}>{row.informatics}</td>
                        <td className={styles.table_td}>{row.summ}</td>
                        <td className={styles.table_td}>{row.orig}</td>
                        <td className={styles.table_td}>{row.prioritet_inoe}</td>

                    </tr>
                ))
            }
        </tbody>
    </table></ContentBlock>;
}

export function TraectoryInfo({ rows }) {
    if (rows == null) {
        return <></>;
    }
    return <ContentBlock>
        <H>{rows.name}</H>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Проходной балл на бюджет:</div><div className={styles.contentSpan_value}>{rows.p}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Занятых мест по квоте:</div><div className={styles.contentSpan_value}>{rows.reit[1].length} / {rows.b * 0.3}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Занятых БВИ:</div><div className={styles.contentSpan_value}>{rows.reit[0].length}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Занятых остальными:</div><div className={styles.contentSpan_value}>{rows.b - (rows.reit[0].length + rows.reit[1].length)}</div></div>
    </ContentBlock>;
}

export function UserInfo({rows, snils}){
    if (rows == null) {
        return <></>;
    }
    return <ContentBlock>
        <H>Информация по абитуриенту {snils}</H>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Позиция в списке:</div><div className={styles.contentSpan_value}>{((rows.reit[3]).find((a)=>(a.snils==snils))).number}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Статус:</div><div className={styles.contentSpan_value}>{(((rows.reit[3]).find((a)=>(a.snils==snils))).summ >= rows.p) ? "Прошёл на бюджет" : "Под чертой"}</div></div>
        <ButtonGroup><Button>Найти абитуриента</Button></ButtonGroup>
    </ContentBlock>;
}