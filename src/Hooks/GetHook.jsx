import axios from "axios"
import React, {useEffect, useState } from "react"

const useGet=(props)=>{

    const [res,setRes]=useState([])
    const axiosData=async()=>{
    try{

        const get=await axios.get(props.url)
        setRes(get.data) 
    }catch{
        console.log("error get")
    }
}
return { res , axiosData }
}
export default useGet