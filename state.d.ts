export interface state{
    notify:{
        loading?:boolean;
        error?:string;
        success?:string;
    },
    auth:{
        access_token?:string;
        user?:userdata;
        msg?:string;
        refresh_token?:string;
    },
    cart:any

}
export interface Action{
    type:string;
    payload:any;
}
export interface userdata{
    name?:string;
    email?:string;
    password?:string;
    cf_password?:string;
    role?:string;
    root?:string;
    avatar?:string;
}
export interface authuser{
    token:string;
    user:userdata;
   }
   interface ErrorState{
    [key:string]: string | number | boolean | ErrorState | null |undefined
}   
type image={
    url:string;
    public_id:string
}
export interface ProductType{
    _id:string;
    images:image[]
    checked:boolean;
    inStock:number;
    sold:number;
    title:string;
    price:number;
    description:string;
    content:string;
    category:string;
}
type Cart={
    length?:number;

}