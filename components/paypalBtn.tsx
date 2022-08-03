/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useRef,useContext,Dispatch } from "react";
import { DataContext } from "../store/GlobalState";
import {state,Action,Order} from "../state"
import {patchData} from "../utils/fetchData"
import { updateItem } from "../store/Actions";
//import order from "../pages/api/order";
// type Props={
//     total:number;
//     address:string;
//     mobile:string;
//     state:state;
//     dispatch:Dispatch<Action>;
    
// }
const PaypalBtn=({order}:any)=>{
  console.log(order)
  const {state, dispatch} = useContext(DataContext)
    const { auth, orders} = state
  
    const refPaypalBtn = useRef<HTMLInputElement>(null)
    useEffect(() => {
       (window as any).paypal.Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: (data:any, actions:any) => {
    
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: order.total // Can also reference a variable or function
                  }
                }]
              });
            },
            // Finalize the transaction after payer approval
            onApprove: (data:any, actions:any) => {
              dispatch({type:'NOTIFY',payload:{loading:true}})
              return actions.order.capture().then(function(orderData:any) {
               
                patchData(`order/${order._id}`,{}, auth.token)
                .then(res => {
                  if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
                  
                  dispatch(updateItem(orders, order._id, {
                    ...order, 
                    paid: true, dateOfPayment: new Date().toISOString(),
              
                  }, 'ADD_ORDERS'))

                  return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
                })
                //console.log(data)
                // Successful capture! For dev/demo purposes:
               // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
            }
          }).render(refPaypalBtn.current);
        
    },[])
    return(
        <div ref={refPaypalBtn}></div>
    )

}
export default PaypalBtn