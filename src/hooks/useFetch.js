import { useEffect, useState } from "react"
import axios from "axios"
const useFetch = (endpoint)=>{ {/**url's endpoint */}
    const [data,setData] = useState([])
    const[loading, setLoading] = useState(false)
    const fetchData = async()=>{
        try{
            setLoading(true)
            const response = await axios.get(endpoint)
            setLoading(false)
            setData(response.data.results)
        }catch(error){
            console.log("hook error",error)
        }
    }

    useEffect(()=>{
        fetchData()
        window.scrollTo(0,0)
    },[endpoint])

    return {data}
}

export default useFetch