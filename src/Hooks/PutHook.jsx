import axios from "axios"

const usePut=(props)=>{

    const axiosDataPut=async(updateData)=>{
    try{
        let s=props.url;
        s+='/';
        s+=updateData.id;
        const put=await axios.put(s,updateData)
    }catch{
        console.log("error put")
    }
}
return { axiosDataPut }
}
export default usePut