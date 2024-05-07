import { HistoryItem } from "../Components/HistoryItem";
import UpdateUserForm from "./../features/user/UpdateUserForm"
import { useQuery } from '@tanstack/react-query';
import { API_URL } from "../keys";
import Cookies from "js-cookie"
import FloatingCard from "../Components/FloatingCard";
import Spinner from "../ui/Spinner";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import "./Profile.css"

export default function Profile(props) {

    const { userType } = useOutletContext();
    const { data: history, status } = useQuery(["history"], fetchHistory);
    const [ balance, setBalance ] = useState(0);

    async function fetchHistory () {
        if (userType == "seller") {
            return null
        }
        const res = await fetch(`${API_URL}/customer/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
          });
          const data = await res.json();
          console.log(data)
          if (data.orders.length == 0) {
            return []
          }
          let history = []
          data.orders.forEach((order) => {
            let date = order.createdAt.substr(0, 10);
            let amount = 0;
            order.orderProducts.forEach((product) => {
                amount += product.quantity * product.productId.price;
            })
            history.push({date, amount})
          })
          console.log(history)
          return history;
    }

    return (
        <>
            {status != "success" ? <Spinner/> :
                <div className="profile-container">
                    <UpdateUserForm setBalance={setBalance}/>
                    {userType == "customer" ? 
                        <>
                        {history.length == 0 ?
                            <FloatingCard title="Purchase history"
                            total={
                                <div className="order-summary">
                                    <h3>No history to show</h3>
                                </div>
                            }/>                    
                        :
                            <FloatingCard title="Purchase history"
                            items={history.map((item, index) => (
                                <HistoryItem
                                key={index}
                                Date={item.date}
                                Address={"nasr city"}
                                Amount={item.amount}
                                />
                            ))}/>
                        }</>
                    :
                        <FloatingCard title="Revenue details"
                        total={
                            <div className="order-summary">
                                    <h3>Total revenue</h3>
                                    <hr></hr>
                                    <p>{balance.toFixed(2)} EGP</p>
                                </div>
                        }/>
                    }
                </div>
            }
        </>
    );
}
