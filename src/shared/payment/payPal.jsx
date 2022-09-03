import React, { useRef } from 'react'
import { useEffect } from 'react';
import style from "./payPal.module.css"
const PayPal = ({ price, buyCourse, name }) => {
    const paypal = useRef();
    useEffect(() => {
        console.log("paypal")
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: name,
                            // מחיר וסוג מטבע
                            amount: {
                                currency_code: "ILS",
                                value: price,

                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                if (order.status == "COMPLETED") {
                        buyCourse()
                }
            },
            onError: err => {
                console.log(err)
                alert("error try again")
            }
        }).render(paypal.current)
    }, [])

    return (
        <div >
            <div ref={paypal}></div>
        </div>
    )
}

export default PayPal