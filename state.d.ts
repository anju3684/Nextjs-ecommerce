export interface state{
    notify:{
        loading?:boolean;
        error?:string;
        success?:string;
    },
 
    auth:authuser,
    cart:ProductType[],
    modal:Modal[],
    orders:Order[],
    users:userdata[],
    categories:Categories[]


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
    auth?:authuser;
    _id?:string;
    
}
export interface cartData{
    address?:string;
    mobile?:string;
    cart?:ProductType[];
    total?:number;
}
export interface authuser{
    token:string;
    user?:userdata;
   }
   export interface ErrorState{
    [key:string]: string | number | boolean | ErrorState | null |undefined
}   
type image={
    url:string;
    public_id:string
}
export interface ProductType{
    _id?:string;
    images:image[]
    checked?:boolean;
    inStock?:number;
    sold?:number;
    title?:string;
    price?:number;
    description?:string;
    content?:string;
    category?:string;
    quantity:number;

}
type Cart={
   length?:number  
}
type Modal={
    data?:ProductType[] | [] | userdata[] | Categories[];
    id?:string;
    title?:string;
    type?:string;

}
export interface Order{
    address?:string;
    cart?:ProductType[];
    createdAt?:string;
    delivered?:boolean;
    mobile?:string;
    paid?:boolean;
    total?:number;
    user?:userdata;
    _id?:string;
    updatedAt?:string;
    method?:string;
    paymentId?:string;
    dateOfPayment?:string;

}
type Categories={
    _id?:string;
    name?:string;
}