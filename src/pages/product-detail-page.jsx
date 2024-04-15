import React, { useState, useCallback, useEffect } from "react";
import { Grid, CardMedia, Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductDetailPage = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState("");

    const loadSelectedProduct = useCallback(() => {
        axios.get("http://localhost:1337/api/products/" + id).then((response) => {
            setSelectedProduct(response.data.data);
        });
    }, []);

    useEffect(() => {
        loadSelectedProduct()
    }, [loadSelectedProduct])

    return (
        <Grid container style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <Grid item={6}>
                <CardMedia
                    component="img"
                    height="140"
                    width="300"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
            </Grid>
            <Grid item={6} >
                <Box style={{ height: 600, width: 400, backgroundColor: "#EEEEEE" }}>
                    <Typography variant="h4" gutterBottom style={{ paddingTop: 15, paddingLeft: 30, paddingBottom: 15 }} >{selectedProduct?.attributes?.name}</Typography>
                    <Typography variant="body2" gutterBottom style={{ paddingLeft: 20, paddingBottom: 25 }}>{selectedProduct.attributes?.detail}</Typography>
                    <Typography style={{ paddingLeft: 20 }}>stok miktarı : {selectedProduct?.attributes?.stock}</Typography>
                    <Typography style={{ paddingLeft: 20 }}>{selectedProduct?.attributes?.price} TL</Typography>
                    <Box style={{ paddingTop: 330, display: "flex", flexDirection: "column" }}>
                        <Button variant="contained">Sepete ekle</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}