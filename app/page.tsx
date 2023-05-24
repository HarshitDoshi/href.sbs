"use client"

import styles from "./page.module.css"
import { useState } from 'react'


export default function Home() {
  const [href, setHREF] = useState<string>("");
  const [sbs, setSBS] = useState<string>("•");
  const [working, setWorking] = useState<boolean>(false);
  const clearData = () => {
    setHREF("");
    setSBS("•");
  }
  const apiHandler = async (data: string) => {
    setWorking(true);
    const response = await fetch(`/a?href=${data}`, {
      method: "GET",
    });
    const responseJSON = await response.json();
    const responseStatus = await responseJSON["status"];
    if (responseStatus === true) {
      const responseMessage = await responseJSON["message"];
      const responseNext = await responseMessage["next"];
      const responsePrevious = await responseMessage["previous"];
      setHREF(responsePrevious);
      setSBS(responseNext);
    } else {
      setSBS("there was an error")
    }
    setWorking(false);
  }
  return (
    <>
      <article className={styles.halfwidthpane}>
        <section className={styles.contact}>
          <input value={href} onChange={(event) => {
            setHREF(event.currentTarget.value);
          }} placeholder='enter a long URL' />
        </section>
        <section className={styles.sbs}>{sbs}</section>
        <section className={styles.logo}>
          <button disabled={working && href.length > 0} onClick={() => {
            !working && href.length > 0
            ? sbs === "•" ? apiHandler(href) : clearData()
            : setSBS("invalid input")
          }} className={styles.bttn}>{sbs === "•" ? "shorten" : "clear"}</button>
        </section>
      </article>
    </>
  )
}
