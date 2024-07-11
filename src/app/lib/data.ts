import {Test, Task, Answer} from "./types"
/* import conn from "@/app/db; */
export async function getEge() {
    const res = await fetch('http://127.0.0.1:5000/ege')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }