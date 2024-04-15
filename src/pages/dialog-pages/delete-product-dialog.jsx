import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useSnackbar } from "notistack";

export const DeleteDialog = (props) => {
  const { isDeleting, deletedProduct, onClose, loadProducts} = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    setDeleteDialogOpen(isDeleting);
  }, [isDeleting]);

  const handleClose = useCallback(() => {
    setDeleteDialogOpen(false);
    onClose();
  }, [onClose,deleteDialogOpen])

  const deleteProduct = useCallback((id) => {
    axios.delete("http://localhost:1337/api/products/" + id).then(response => {
      if (response.status === 200) {
        loadProducts();
        setDeleteDialogOpen(false);
        onClose();
        enqueueSnackbar(deletedProduct?.attributes?.name + " isimli ürün silindi." ,{variant:"success"})
      }
      else {
        console.log("Hata aldık", response.statusText);
      }
    });
  }, [loadProducts, deleteDialogOpen])

  return (
    <Dialog open={deleteDialogOpen}>
      <DialogTitle>
        {deletedProduct?.attributes?.name} : isimli ürünü silmek istediğinize emin misiniz?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => deleteProduct(deletedProduct.id)}>Sil</Button>
        <Button onClick={handleClose}>Çıkış</Button>
      </DialogActions>
    </Dialog>
  )
}