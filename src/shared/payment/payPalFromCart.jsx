import React, { useRef } from 'react'
import { useEffect } from 'react';
const PayPalFromCart = ({ price, buyCourse, name, short_id, setIsCheckOut }) => {
    console.log(name)
    const paypal = useRef();
    useEffect(() => {
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
                console.log("buying...")
                const order = await actions.order.capture();
                if (order.status == "COMPLETED") {
                    buyCourse(short_id)
                    setIsCheckOut(false)
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

export default PayPalFromCart