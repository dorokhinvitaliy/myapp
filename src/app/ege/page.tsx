"use client";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Input, InputGroup, SelectBox } from "../ui/components/input";

import Button, { ButtonGroup } from "../ui/components/button";
import { parseClass } from "../utils/parseClass";
const preData = {
    snils: "188-291-227 05",
    prior_limit: 5,
    available_v: [
        { id: 1, label: "НИУ ВШЭ" },
        { id: 2, label: "МФТИ" },
        { id: 3, label: "МГТУ им. Баумана" }
    ],
    selected_v: null,
    available_p: [
        { id: 1, label: "Бизнес-информатика" },
        { id: 2, label: "Прикладная математика и информатика" },
        { id: 3, label: "Программная инженерия" },
        { id: 4, label: "Информатика и вычислительная техника" },
        { id: 5, label: "Информационная безопаность" }
    ],
    selected_p: null,
    orig_a: 0
}
import axios from 'axios';
import { useRef } from "react";
import Modal from "../ui/components/Modal";
import { headers } from "../../../node_modules/next/headers";
import CustomTable, { CustomTableBody, CustomTableCell, CustomTableHeader, CustomTableRow } from "../ui/components/CustomTable";
import { CheckedIcon, CloseOutlineIcon } from "../ui/icons";

export default function Page() {
    const [loadError, updLoadError] = useState(false);
    const [loading, changeLoading] = useState("no");
    const [upRows, chUpRows] = useState(false);
    const [rows, updRows] = useState(null);
    const [data, updData] = useState(preData);
    const [modal, modalUpd] = useState(false);
    const [modalSnilsInfo, updateModalSnilsInfo] = useState(null);
    const userRef = useRef();
    function loadInfo() {
        const apiUrl = `http://127.0.0.1:5000/ege`;
        changeLoading("loading");
        axios.post(apiUrl,
            {
                vuz: data.selected_v,
                
                napr: data.selected_p,
                prior: data.prior_limit,
                attestat: data.orig_a
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => {
                updLoadError(false);
                const rows_t = resp.data;
                updRows(rows_t);
                changeLoading("loaded");
            }).catch(function (error) {
                updRows(null);
                changeLoading("loaded");
                updLoadError(true);
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser
                  // and an instance of http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
              });
    }

    function updateLoad(){
        const apiUrl = `http://127.0.0.1:5000/ege/parse`;
        changeLoading("loading");
        chUpRows(true);
        axios.get(apiUrl,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => {
                loadInfo();
                chUpRows(false);
            });
    }

    const [validForm, validFormUpd] = useState(false);
    function is_valid() {
        /* if (data.snils == "") return false */
        if (data.selected_v === null) return false
        if (data.selected_p === null) return false
        return true
    }
    function openUserModal(snils) {
        updateModalSnilsInfo(null);
        modalUpd(true);
        axios.post("http://127.0.0.1:5000/ege/snils",
            {
                snils: snils
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => {
                updateModalSnilsInfo({ snils: snils, naprs: resp.data });

            });

    }
    function Position(obj) {
        var currenttop = 0;
        if (obj.offsetParent) {
            do {
                currenttop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return [currenttop];
        }
    }
    function scrollTo() {
        /* userRef.current.scrollIntoView(); */
        /* window.scroll(0, Position(userRef.current)[0] - 200, "smooth"); */
        window.scrollTo({
            top: Position(userRef.current)[0] - 200,
            left: 0,
            behavior: 'smooth'
          });

    }
    function openNapr(napr){
        var napr_id = data.available_p.find((a)=>a.label==napr).id;
        var snils = modalSnilsInfo.snils;
        console.log(data.available_p, napr, snils);
        updData({...data, snils: snils, selected_p: napr_id});
        modalUpd(false);
        loadInfo();
    }
    useEffect(() => {
        validFormUpd(is_valid());
    }, [data]);
    return <div className={styles.workspace}>
        <Modal options={{ header: true, title: "Информация об абитуриенте" }} opened={modal} changeOpened={modalUpd}>
            {
                modalSnilsInfo == null ? (
                    <>
                        <div className={styles.contentSpan}><div className={styles.contentSpan_title}><span className={styles.contentPlaceholder}>СНИЛС</span></div><div className={styles.contentSpan_value}><span className={styles.contentPlaceholder}>xxxx-xxxx-xxxx xx</span></div></div>
                        <div className={styles.contentSpan}><span className={styles.contentPlaceholder}>приоритеты у абитуриента:</span></div>
                        <table className={styles.nTable}>
                            <colgroup>
                                <col span="1" style={{ width: "0%" }} />
                                <col span="1" style={{ width: "10%" }} />
                                <col span="1" style={{ width: "10%" }} />
                                <col span="1" style={{ width: "50%" }} />
                                <col span="1" style={{ width: "30%" }} />
                            </colgroup>
                            <thead className={styles.nTable_head}>
                                <tr><th><span className={styles.contentPlaceholder}>№</span></th><th><span className={styles.contentPlaceholder}>ВУЗ</span></th><th><span className={styles.contentPlaceholder}>Направление</span></th><th style={{ textAlign: 'center' }}><span className={styles.contentPlaceholder}>Статус</span></th></tr>
                            </thead>
                            <tbody>
                                {
                                    [{ prior: 10, vuz: "XXXX", napr: "XXX", status: true }, { prior: 9, vuz: "XXXX", napr: "XXXXX", status: false }, { prior: 100, vuz: "XXXX", napr: "XXXXX", status: true }].map((napr) => (
                                        (<tr key={napr.prior}><td><span className={styles.contentPlaceholder}>{napr.prior}</span></td><td><span className={styles.contentPlaceholder}>{napr.vuz}</span></td><td><span className={styles.contentPlaceholder}>{napr.napr}</span></td>{(napr.status) ? (<td style={{ color: "var(--dark-blue)", textAlign: "center" }}><span className={styles.contentPlaceholder}>xxx</span></td>) : (<td style={{ color: "red", textAlign: "center" }}><span className={styles.contentPlaceholder}>xxx</span></td>)}</tr>)
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>СНИЛС</div><div className={styles.contentSpan_value}>{modalSnilsInfo?.snils}</div></div>
                        <div className={styles.contentSpan}>Мы нашли следующие приоритеты у абитуриента: </div>
                        <table className={styles.nTable}>
                            <colgroup>
                                <col span="1" style={{ width: "0%" }} />
                                <col span="1" style={{ width: "10%" }} />
                                <col span="1" style={{ width: "10%" }} />
                                <col span="1" style={{ width: "50%" }} />
                                <col span="1" style={{ width: "30%" }} />
                            </colgroup>
                            <thead className={styles.nTable_head}>
                                <tr><th>№</th><th>ВУЗ</th><th>Направление</th><th style={{ textAlign: 'center' }}>Статус</th></tr>
                            </thead>
                            <tbody>
                                {
                                    modalSnilsInfo?.naprs.map((napr) => (
                                        (<tr key={napr.napr} onClick={()=>openNapr(napr.napr)}><td>{napr.prior}</td><td>{napr.vuz}</td><td>{napr.napr}</td>{(napr.status) ? (<td style={{ color: "var(--dark-blue)", textAlign: "center" }}><CheckedIcon width={20} height={20} /></td>) : (<td style={{ color: "red", textAlign: "center" }}><CloseOutlineIcon width={30} height={30} /></td>)}</tr>)
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                )
            }


        </Modal>
        <ContentBlock>
            <H>Поиск</H>
            <InputGroup>
                <Input value={data.snils} onChange={(e) => (updData({ ...data, snils: e.target.value }))} placeholder={"СНИЛС"} />
            </InputGroup>
            <InputGroup>
                <Input value={data.prior_limit} dataType={'number'} onChange={(e) => (updData({ ...data, prior_limit: e.target.value }))} placeholder={"Приоритет до"} />
                <SelectBox value={data.orig_a} onChange={(val) => (updData({ ...data, orig_a: val }))} placeholder={"Оригинал аттестата"} options={[{ id: 1, label: "Да" }, { id: 2, label: "Нет" }, { id: 0, label: "Все" }]}></SelectBox>
            </InputGroup>
            <InputGroup>
                <SelectBox value={data.selected_v} onChange={(v) => (updData({ ...data, selected_v: v }))} placeholder={"ВУЗ"} options={data.available_v}></SelectBox>
                <SelectBox value={data.selected_p} onChange={(v) => (updData({ ...data, selected_p: v }))} placeholder={"Направление подготовки"} options={data.available_p}></SelectBox>
            </InputGroup>
            <ButtonGroup>
                <Button disabled={(!validForm) || (loading=="loading")} onClick={() => (loadInfo())}>{loading != "loading" ? "Сформировать" : "Формирую..."}</Button>

                {rows !== null &&
                    (<Button disabled={upRows} onClick={()=>(updateLoad())} secondary>{upRows ? "Обновление..." : "Обновить данные"}</Button>)
                }
            </ButtonGroup>

        </ContentBlock>
        { loadError && (<ContentBlock>
            <H>Произошла ошибка, попробуйте обновить данные</H>
            <ButtonGroup>
                
                    <Button disabled={upRows} onClick={()=>(updateLoad())}>{upRows ? "Обновление..." : "Обновить данные"}</Button>
                
            </ButtonGroup>
        </ContentBlock>) }

        <TraectoryInfo loading={loading} rows={rows} />
        <UserInfo findUser={scrollTo} loading={loading} rows={rows} snils={data.snils} />
        <Table openUserModal={openUserModal} loading={loading} userRef={userRef} rows={rows} snils={data.snils} />

    </div>;
}

export function ContentBlock({ children }: { children?: React.ReactNode }) {
    return <div className={styles.contentBlock}>
        {children}
    </div>;
}

export function H({ children, className }: { children?: React.ReactNode, className?: string }) {
    return <p className={parseClass([styles.contentHeader, className || ""])}>{children}</p>
}



export function TableSuspense() {
    return <ContentBlock><table className={styles.table}>
        <thead className={styles.stickyHeader}>
            <tr>
                <th className={styles.table_th} rowSpan={2}><span className={styles.contentPlaceholder}>№</span></th>
                <th className={styles.table_th} rowSpan={2}><span className={styles.contentPlaceholder}>СНИЛС</span></th>
                <th className={styles.table_th} rowSpan={2}><span className={styles.contentPlaceholder}>Особые права</span></th>

                <th className={styles.table_th} colSpan={4}><span className={styles.contentPlaceholder}>Баллы ЕГЭ</span></th>
                <th className={styles.table_th} rowSpan={2}><span className={styles.contentPlaceholder}>Оригинал аттестата</span></th>
                <th className={styles.table_th} rowSpan={2}><span className={styles.contentPlaceholder}>Приоритет</span></th>
            </tr>
            <tr>

                <th className={styles.table_th}><span className={styles.contentPlaceholder}>Мат-ка</span></th>
                <th className={styles.table_th}><span className={styles.contentPlaceholder}>Русс. яз.</span></th>
                <th className={styles.table_th}><span className={styles.contentPlaceholder}>Инф-ка</span></th>
                <th className={styles.table_th}><span className={styles.contentPlaceholder}>Сумма</span></th>
            </tr>
        </thead>
        <tbody>
            <tr><td className={styles.table_td} colSpan={9}><b><span className={styles.contentPlaceholder}>БВИ</span></b></td></tr>
            {[0, 1, 2, 3].map((z) => (<tr key={z}>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>-xxxxx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xxxx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xxx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xxx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xxxx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xxx</span></td>
                <td className={styles.table_td}><span className={styles.contentPlaceholder}>xx</span></td>

            </tr>))}

        </tbody></table></ContentBlock>;
}

export function Table({ loading, rows, snils, userRef, openUserModal }) {
    if (loading == "no") return <></>;
    if (loading == "loading") return <TableSuspense />;
    if (rows == null) {
        return <></>;
    }
    function shortSnils(str) {
        /* return str; */
        return str.slice(0, 5) + "...";
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

                <th className={styles.table_th} >МАТ</th>
                <th className={styles.table_th} >РУС</th>
                <th className={styles.table_th} >ИНФ</th>
                <th className={styles.table_th} >Сумм.</th>
            </tr>
        </thead>
        <tbody>
            <tr><td className={styles.table_td} colSpan={9}><b>БВИ</b></td></tr>
            {
                rows.reit[0].map((row) => (
                    <tr onClick={() => { openUserModal(row.snils) }} key={row.id} ref={row.snils == snils ? userRef : null} className={parseClass([[styles.selectedRow, row.snils == snils], [styles.redLine, row.number == rows.b]])}>
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
                    <tr onClick={() => { openUserModal(row.snils) }} key={row.id} ref={row.snils == snils ? userRef : null} className={parseClass([[styles.selectedRow, row.snils == snils], [styles.redLine, row.number == rows.b]])}>
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
                    <tr onClick={() => { openUserModal(row.snils) }} key={row.id} ref={row.snils == snils ? userRef : null} className={parseClass([[styles.selectedRow, row.snils == snils], [styles.redLine, row.number == rows.b]])}>
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

export function TraectoryInfoSuspense() {
    return <ContentBlock>
        <H className={styles.contentPlaceholder}>&nbsp;</H>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title, styles.contentPlaceholder, styles.contentPlaceholder_lx])}>&nbsp;</div><div className={parseClass([styles.contentSpan_value, styles.contentPlaceholder, styles.contentPlaceholder_sx])}>&nbsp;</div></div>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title, styles.contentPlaceholder, styles.contentPlaceholder_ly])}>&nbsp;</div><div className={parseClass([styles.contentSpan_value, styles.contentPlaceholder, styles.contentPlaceholder_sy])}>&nbsp;</div></div>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title, styles.contentPlaceholder, styles.contentPlaceholder_lx])}>&nbsp;</div><div className={parseClass([styles.contentSpan_value, styles.contentPlaceholder, styles.contentPlaceholder_sy])}>&nbsp;</div></div>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title, styles.contentPlaceholder, styles.contentPlaceholder_ly])}>&nbsp;</div><div className={parseClass([styles.contentSpan_value, styles.contentPlaceholder, styles.contentPlaceholder_sx])}>&nbsp;</div></div>

    </ContentBlock>;
}

export function TraectoryInfo({ loading, rows }) {
    if (loading == "no") return <></>;
    if (loading == "loading") return <TraectoryInfoSuspense />;
    if (rows == null) {
        return <></>;
    }
    return <ContentBlock>
        <H>{rows.name}</H>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Проходной балл на бюджет:</div><div className={styles.contentSpan_value}>{(rows.b - (rows.reit[0].length + rows.reit[1].length)) > 0 ? rows.p : "нет"}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Занятых мест по квоте:</div><div className={styles.contentSpan_value}>{rows.reit[1].length}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Занятых БВИ:</div><div className={styles.contentSpan_value}>{rows.reit[0].length}</div></div>
        <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Занятых остальными:</div><div className={styles.contentSpan_value}>{(rows.b - (rows.reit[0].length + rows.reit[1].length) > 0 ? rows.b - (rows.reit[0].length + rows.reit[1].length) : 0)}</div></div>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title,styles.contentSpan_title_info])}>Данные обновлены {rows.version_date}</div></div>
    </ContentBlock>;
}

export function UserInfoSuspense() {
    return <ContentBlock>
        <H className={styles.contentPlaceholder}>&nbsp;</H>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title, styles.contentPlaceholder, styles.contentPlaceholder_lx])}>&nbsp;</div><div className={parseClass([styles.contentSpan_value, styles.contentPlaceholder, styles.contentPlaceholder_sx])}>&nbsp;</div></div>
        <div className={styles.contentSpan}><div className={parseClass([styles.contentSpan_title, styles.contentPlaceholder, styles.contentPlaceholder_ly])}>&nbsp;</div><div className={parseClass([styles.contentSpan_value, styles.contentPlaceholder, styles.contentPlaceholder_sy])}>&nbsp;</div></div>
    </ContentBlock>;
}

export function UserInfo({ loading, rows, snils, findUser }) {
    if (loading == "no" || snils=="") return <></>;
    if (loading == "loading") return <UserInfoSuspense />;
    if (rows == null) {
        return <></>;
    }

    if (rows.reit[3].find((o) => (o.snils == snils))) {
        return <ContentBlock>
            <H>Информация по абитуриенту {snils}</H>
            <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Позиция в списке:</div><div className={styles.contentSpan_value}>{((rows.reit[3]).find((a) => (a.snils == snils))).number}</div></div>
            <div className={styles.contentSpan}><div className={styles.contentSpan_title}>Статус:</div><div className={styles.contentSpan_value}>{(((rows.reit[3]).find((a) => (a.snils == snils))).number <= rows.b) ? "Прошёл на бюджет" : "Под чертой"}</div></div>
            <ButtonGroup><Button onClick={(e) => (findUser())}>Найти абитуриента</Button></ButtonGroup>
        </ContentBlock>;
    }
    return <ContentBlock>
        <H>Информация по абитуриенту {snils}</H>
        <div className={styles.contentSpan}>Не найден</div>
        <ButtonGroup><Button>Обновить списки</Button></ButtonGroup>
    </ContentBlock>;
}

