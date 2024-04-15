import React ,{useState,useEffect,useCallback} from "react";
import {Button , Dialog ,DialogActions, DialogTitle} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

export const DeleteCategoryDialog=(props)=>{
const {isCategoryDeleting,deletedCategory,onClose,loadCategories} = props;
const [categoryDeleteDialogOpen , setCategoryDeleteDialogOpen]=useState(false);
const { enqueueSnackbar } = useSnackbar();


useEffect(() => {
    setCategoryDeleteDialogOpen(isCategoryDeleting);
  }, [isCategoryDeleting]);

  const handleClose = useCallback(() => {
    setCategoryDeleteDialogOpen(false);
    onClose();
  }, [onClose,categoryDeleteDialogOpen])

  const deleteCategory= useCallback((id) => {
    axios.delete("http://localhost:1337/api/categories/" + id).then(response => {
      if (response.status === 200) {
        loadCategories();
        setCategoryDeleteDialogOpen(false);
        onClose();
        enqueueSnackbar(deletedCategory?.attributes?.name + " kategorisi silindi." ,{variant:"success"})
      }
      else {
        console.log("Hata aldık", response.statusText);
      }
    });
  }, [loadCategories, categoryDeleteDialogOpen])

    return(
        <div>
     <Dialog open={categoryDeleteDialogOpen}>
   <DialogTitle>
     {deletedCategory?.attributes?.name} : isimli kategoriyi silmek istediğinize emin misiniz?
   </DialogTitle>
   <DialogActions>
     <Button onClick={()=>deleteCategory(deletedCategory.id)} >Sil</Button>
     <Button onClick={handleClose}>Kapat</Button>
   </DialogActions>
 </Dialog>
        </div>
    )
}