import {names} from "./atmNames"
import { parkedAtms } from "./atmNames"
export const outOfService=(res)=>{
        // console.log('res is ',res);

        const allAtms=Object.keys(names)
        const parked=Object.keys(parkedAtms)
        // console.log('all atm keys',allAtms);
        const result=allAtms.filter((val)=>{
        return (!res.includes(val) && !parked.includes(val))
   })
   return result
}

export const parked_atms=()=>{
        const parked=Object.keys(parkedAtms)
        return parked
}

