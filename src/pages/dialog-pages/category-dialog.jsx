import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";


export const CategoryDialog = (props) => {
    const { isCategoryAdding, isCategoryUpdating, setUpdatedCategory, updatedCategory, loadCategories, setIsCategoryAdding, setIsCategoryUpdating } = props;
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isCategoryAdding || isCategoryUpdating) {
            setCategoryDialogOpen(true);
        } else {
            setCategoryDialogOpen(false)
        }
    }, [isCategoryAdding, isCategoryUpdating])

    useEffect(() => {
        if (isCategoryUpdating) {
            setNewCategoryName(updatedCategory?.attributes?.name);
        }
    }, [updatedCategory, isCategoryUpdating])


    useEffect(() => {
        if (!categoryDialogOpen) {
            setNewCategoryName("");
            setIsCategoryAdding(false);
            setIsCategoryUpdating(false);
        }
    }, [categoryDialogOpen]);

    const categoryDialogClose = useCallback(() => {
        setIsCategoryAdding(false);
        setIsCategoryUpdating(false);
        setCategoryDialogOpen(false);
        setNewCategoryName("");
        setUpdatedCategory(null);
        console.log("T1");
        enqueueSnackbar("Çıkış yapıldı");
        console.log("T2");
    }, [categoryDialogOpen, newCategoryName, isCategoryAdding, isCategoryUpdating])

    const addCategory = useCallback(() => {
        if (newCategoryName === "") {
            alert("lütfen kategori alanını doldurun")
        } else {
            axios.post("http://localhost:1337/api/categories", {
                data: {
                    name: newCategoryName,
                }
            }).then(response => {
                if (response.status === 200) {
                    loadCategories();
                    setCategoryDialogOpen(false);
                    setNewCategoryName("");
                    enqueueSnackbar("yeni kategori eklendi" , {variant: 'success'})
                }
                else {
                    console.log("Hata aldık", response.statusText);
                }
            }).finally(() => {
                setIsCategoryAdding(false);
            });
        }
    }, [loadCategories, isCategoryAdding, newCategoryName, categoryDialogOpen])

    const updateCAtegory = useCallback(() => {
        axios.put("http://localhost:1337/api/categories/" + updatedCategory.id, {
            data: {
                name: newCategoryName
            }
        }).then(response => {
            if (response.status === 200) {
                loadCategories();
                setCategoryDialogOpen(false);
                setNewCategoryName("");
                setIsCategoryUpdating(false);
                enqueueSnackbar(newCategoryName + " olarak güncellendi." ,{variant:"success"})
            } else {
                console.log("hata aldık ", response.statusText)
            }
        })
    }, [newCategoryName, updatedCategory, loadCategories, categoryDialogOpen, isCategoryUpdating])

    return (

        <Dialog open={categoryDialogOpen} >
            <DialogTitle>{isCategoryAdding ? "Kategori Ekle" : "Kategori Güncelle"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={8} ><TextField
                        id="standard-basic"
                        label="Kategori Adı"
                        variant="standard"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={3}><Button onClick={categoryDialogClose}>Kapat</Button></Grid>
                    <Grid item xs={3}>{isCategoryAdding ?
                        <Button onClick={addCategory}>Ekle</Button> :
                        <Button onClick={updateCAtegory}>Güncelle</Button>}</Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    )
}

