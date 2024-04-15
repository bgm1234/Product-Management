import { Button, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogActions } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { DetailDialog } from "./dialog-pages/detail-product-dialog";
import { DeleteDialog } from "./dialog-pages/delete-product-dialog";
import { ProductDialog } from "./dialog-pages/product-dialog";
export const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState("");
    const [isDetailing, setIsDetailing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletedProduct, setDeletedProduct] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState("");

    const loadProducts = useCallback(() => {
        axios.get("http://localhost:1337/api/products").then((response) => {
            setProducts(response.data.data);
            console.log("RESPONSE: ", response.data.image);
            setDeletedProduct("");
        });
    }, []);

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    const handleDetailClick = useCallback((product) => {
        setDetailProduct(product);
        setIsDetailing(true);
    }, [detailProduct, isDetailing])

    const handleCloseDetailDialog = useCallback(() => {
        setIsDetailing(false);
    }, [isDetailing]);

    const handleDeleteClick = useCallback((product) => {
        setIsDeleting(true);
        setDeletedProduct(product);
    }, [isDeleting, deletedProduct])

    const handleCloseDeleteDialog = useCallback(() => {
        setIsDeleting(false);
        setDeletedProduct(null);
    }, [])

const handleAddProduct =useCallback(()=>{
    setIsAdding(true)
},[isAdding])

const handleUpdatingClick= useCallback((product)=>{
setIsUpdating(true);
setUpdatedProduct(product)
},[])

    return (
        <div style={{ display: "flex" }}>
            <div>
                <Box style={{ padding: 10 }}>
                    <Paper style={{ width: 800 }}>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Ürünler</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                            <Button onClick={handleAddProduct}>Ürün Ekle</Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ürün id</TableCell>
                                        <TableCell>ürün adı </TableCell>
                                        <TableCell>ürün kategorisi</TableCell>
                                        <TableCell>stok miktarı</TableCell>
                                        <TableCell>fiyatı </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell >{u.id}</TableCell>
                                            <TableCell>{u.attributes.name}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>{u.attributes.stock}</TableCell>
                                            <TableCell>{u.attributes.price}</TableCell>
                                            <TableCell>
                                                <Button size="small" onClick={()=>handleUpdatingClick(u)} >güncelle </Button>
                                                <Button size="small" onClick={() => handleDeleteClick(u)}>sil</Button>
                                                <Button size="small" onClick={() => handleDetailClick(u)}>detay</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <ProductDialog
                            loadProducts={loadProducts}
                            isAdding={isAdding}
                            isUpdating={isUpdating}
                            setIsAdding={setIsAdding}
                            setIsUpdating={setIsUpdating}
                            updatedProduct={updatedProduct}/>
                            <DeleteDialog
                                isDeleting={isDeleting}
                                deletedProduct={deletedProduct}
                                loadProducts={loadProducts}
                                onClose={handleCloseDeleteDialog} />
                            <DetailDialog
                                isDetailing={isDetailing}
                                detailProduct={detailProduct}
                                onClose={handleCloseDetailDialog}
                            />
                        </TableContainer>
                    </Paper>
                </Box>
            </div>
        </div>
    )
}