import axios from "axios"
import React, {useEffect, useState } from "react"

const usePost=(props)=>{

    const axiosDataPost=async(newData)=>{
    try{
        const post=await axios.post(props.url,newData)
    }catch{
        console.log("error post")
    }
}
return { axiosDataPost }
}
export default usePost