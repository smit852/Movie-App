import { useEffect, useState } from "react"
import axios from "axios"

const useFetchDetails = (endpoint)=>{ {/**url's endpoint */}
    const [data,setData] = useState()
    const[loading, setLoading] = useState(false)
    // console.log("hook data", data)
    const fetchData = async()=>{
        try{
            setLoading(true)
            const response = await axios.get(endpoint)
            setLoading(false)
            // console.log("response",response)
            setData(response.data)
        }catch(error){
            console.log("hook error",error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[endpoint])

    return {data}
}

export default useFetchDetails