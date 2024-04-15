import React, {useState,useEffect ,useCallback} from "react";
import {Dialog,DialogTitle,DialogContent,TextField,Grid,Button} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

export const ProductDialog = (props)=>{
    const {loadProducts,isAdding,isUpdating,updatedProduct,setIsAdding,setIsUpdating}=props;
    const [open ,setOpen]=useState(false);
    const [newName , setNewName]=useState("");
    const [newDetail,setNewDetail]=useState("");
    const [newPrice, setNewPrice]=useState("");
    const [newStock , setNewStock]=useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isUpdating || isAdding) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [isUpdating, isAdding]);

    useEffect(() => {
        if (isUpdating) {
            setNewName(updatedProduct.attributes.name);
            setNewDetail(updatedProduct.attributes.detail);
            setNewPrice(updatedProduct.attributes.price);
            setNewStock(updatedProduct.attributes.stock);
        }
    }, [isUpdating, updatedProduct]);

    const updateProduct = useCallback(() => {
     
        axios.put("http://localhost:1337/api/products/" + updatedProduct.id, {
            data: {
                name: newName,
                detail: newDetail,
                price: newPrice,
                stock: newStock,
            }
        }).then(response => {
            if (response.status === 200) {
                loadProducts();
                setIsUpdating(false);
                setOpen(false);
                temizle();
                enqueueSnackbar("ürün güncellendi." ,{variant:"success"})
            } else {
                console.log("Hata aldık", response.statusText);
            }
        })
    }, [loadProducts, newName,newDetail, newPrice, newStock])

    const addProduct = useCallback(() => {
        axios.post("http://localhost:1337/api/products", {
            data: {
                name: newName,
                detail: newDetail,
                price: newPrice,
                stock: newStock,
            }
        }).then(response => {
            if (response.status === 200) {
                loadProducts();
                setOpen(false);
                temizle();
                setIsAdding(false);
                enqueueSnackbar("ürün eklendi." ,{variant:"success"})
            }
            else {
                console.log("Hata aldık", response.statusText);
            }
        });
    }, [loadProducts, isAdding, newName, newPrice, newStock, newDetail, open])

    const temizle = useCallback(() => {
        setNewName("");
        setNewDetail("");
        setNewStock("");
        setNewPrice("");
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false);
        setIsAdding(false);
        setIsUpdating(false);
        temizle();
    }, [isAdding, isUpdating])

    return(
        <div>
         <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{isAdding ? "Ürün Ekle" : "Ürün Güncelle"}</DialogTitle>
    <DialogContent>
        <Grid container spacing={2} mt={1}>
            <Grid item xs={6} ><TextField id="standard-basic" label="Ürün Adı"
                value={newName} onChange={(e) => setNewName(e.target.value)}></TextField></Grid>
            <Grid item xs={12}><TextField
                id="standard-basic"
                label="İçerik"
                multiline   
                sx={{ width: '100%' }}
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
            ></TextField></Grid>
            <Grid item xs={6} ><TextField id="standard-basic" label="Stok Miktarı"
                value={newStock} onChange={(e) => setNewStock(e.target.value)}></TextField></Grid>
            <Grid item xs={6}><TextField id="standard-basic" label="Fiyatı"
                value={newPrice} onChange={(e) => setNewPrice(e.target.value)}></TextField></Grid>
            <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button onClick={handleClose}>Çıkış</Button>
                {isAdding ? <Button onClick={addProduct}>Ekle</Button> : <Button onClick={updateProduct}>Güncelle</Button>}
            </Grid>
        </Grid>
    </DialogContent>
</Dialog>
        </div>
    )
}