import axios from "axios"

const usePut=(props)=>{

    const axiosDataPut=async(updateData)=>{
    try{
        const put=await axios.put(props.url,updateData)
    }catch{
        console.log("error put")
    }
}
return { axiosDataPut }
}
export default usePut