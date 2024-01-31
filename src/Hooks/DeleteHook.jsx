import axios from "axios"

const useDelete=(props)=>{

    
    const axiosDataDelete=async(id)=>{
    try{
        console.log('i am in delete')
        let s=props.url;
        s+='/';
        s+=id;
        const deleteT=await axios.delete(s,id)
        console.log('i am finish delete')
    }catch{
        console.log("error delete")
    }
}
return { axiosDataDelete }
}
export default useDelete