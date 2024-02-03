import axios from "axios"

const useDelete=(props)=>{

    
    const axiosDataDelete=async(id)=>{
    try{
        let s=props.url;
        s+='/';
        s+=id;
        const deleteT=await axios.delete(s,id)
    }catch{
        console.log("error delete")
    }
}
return { axiosDataDelete }
}
export default useDelete