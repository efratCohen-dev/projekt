import axios from "axios"

const useDelete=(props)=>{

    const axiosDataDelete=async(id)=>{
    try{
        const deleteT=await axios.delete(props.url,id)
    }catch{
        console.log("error delete")
    }
}
return { axiosDataDelete }
}
export default useDelete