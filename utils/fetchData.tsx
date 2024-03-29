import { userdata,cartData,Categories, ProductType } from "../state";
const baseUrl=process.env.BASE_URL
export const getData=async(url:string,token:string)=>{
    console.log(url)
    let headers;
    const res=await fetch(`${baseUrl}/api/${url}`,{
        method:'GET',
         headers:{
            'Authorization':token,
            'Content-Type':'application/json'
         }
    })
    const data=await res.json();
     console.log(data)
    return data
}

export const postData=async(url:string,post:userdata | cartData | Categories | ProductType,token:string)=>{
    // console.log(post)
    let headers;
    if(token){
        headers={
            'Authorization':token,
            'Content-Type':'application/json'
        }
    }
    else{
        headers={
            'Content-Type':'application/json'
        }
    }
    const res=await fetch(`${baseUrl}/api/${url}`,{
        method:'POST',
       
        headers:headers,
        body:JSON.stringify(post)
    })
    const data=await res.json();
    //  console.log(data)
    return data
}
export const putData = async (url:string, post:userdata| Categories | ProductType, token:string) => {
    
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Authorization':token,
            'Content-Type': 'application/json',
      
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}
type Post={
    paymentId:string;
}

export const patchData = async (url:string, post:userdata | Post | {}, token:string) => {
    
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PATCH',
        headers:  {
            'Content-Type': 'application/json',
            'Authorization':token,
      
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const deleteData = async (url:string, token:string) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token,
        }
    })

    const data = await res.json()
    return data
}

