import React, { useCallback, useState } from "react";
import { Button, Card, Grid, Typography, Link, TextField } from "@mui/material";
import { useBasketContext } from "../context/basket-context";
import { PaymentDialog } from "./dialog-pages/payment-dialog";


export const PaymentPage = () => {
    const { products,completeOrder } = useBasketContext();
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [payment, setPayment] = useState("");
   

    const basketTotal = products.reduce((acc, item) => acc + (item.count * item.price), 0)

    const handlePaymentComplete =useCallback(()=>{
        setPayment(true);
        completeOrder();
    },[payment,completeOrder])


    return (
        <Grid container style={{ marginTop: 50, marginLeft: 10 }} spacing={2}>
            <Grid item xs={12} md={9}>
                <Typography sx={{ mb: 2 }} variant="h6" gutterBottom>Teslimat Adresi</Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={5}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    sx={{ width: '80%' }}
                />
                <Typography sx={{ mb: 2, mt: 2 }} variant="h6" gutterBottom>Ödeme Bilgileri</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Kart Numarası"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    sx={{ width: '40%' }}
                />
                <Typography sx={{ mt: 1 }} variant="caption" display="block" gutterBottom>Ödemeyi tamamlayabilmek için teslimat adresi ve ödeme bilgilerinizi giriniz.</Typography>

            </Grid>
            <Grid item xs={12} md={2}>
                <Card style={{ border: '1px solid #ccc', borderRadius: '8px', width: 250, height: 400, marginLeft: 20 }}>
                    <Typography style={{ textAlign: "center", marginTop: 15 }}>Sipariş Özeti</Typography>
                    <Typography style={{ marginLeft: 10, marginTop: 10 }} variant="body2">Ürünün toplamı : {basketTotal} &nbsp;₺ </Typography>
                    <Button disabled={!deliveryAddress || !cardNumber} onClick={handlePaymentComplete} sx={{ marginLeft: "auto", width: "100%", marginTop: 33 }} variant="contained" size="small" color="primary">Ödemeyi Tamamla</Button>
                </Card>
            </Grid>
            <PaymentDialog
            payment={payment} />
        </Grid>
    )
}