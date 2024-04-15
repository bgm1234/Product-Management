import React, { useState, useCallback, useEffect } from "react";
import { Button, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import { DeleteCategoryDialog } from "./dialog-pages/delete-category-dialog";
import { CategoryDialog } from "./dialog-pages/category-dialog";


export const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [isCategoryDeleting, setIsCategoryDeleting] = useState(false);
    const [deletedCategory, setDeletedCategory ] = useState("");
    const [isCategoryAdding , setIsCategoryAdding] = useState(false);
    const [isCategoryUpdating , setIsCategoryUpdating] = useState(false);
    const [updatedCategory , setUpdatedCategory]=useState("");


    const loadCategories = useCallback(() => {
        axios.get("http://localhost:1337/api/categories").then((response) => {
            setCategories(response.data.data);
            console.log("RESPONSE: ", response.data.image);
        });
    }, []);
    useEffect(() => {
        loadCategories()
    }, [loadCategories])

    console.log(categories);

    const handleDeleteCategoryClick = useCallback((category) => {
       setIsCategoryDeleting(true);
       setDeletedCategory(category);
      }, [isCategoryDeleting,deletedCategory]);
      
      const handleCloseDeleteCategoryDialog = useCallback(() => {
        setIsCategoryDeleting(false);
        setDeletedCategory(null);
    }, [isCategoryDeleting,deletedCategory])

    const  handleAddCategoryClick =useCallback(()=>{
         setIsCategoryAdding(true);
    },[isCategoryAdding])

    const handleUpdateCategoryClick= useCallback((category)=>{
       setIsCategoryUpdating(true);
       setUpdatedCategory(category)
    },[isCategoryUpdating,updatedCategory])

    return (
        <div style={{ display: "flex" }}>
            <div>
                <Box style={{ padding: 10 }}>
                    <Paper style={{ width: 700 }}>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Kategoriler</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "center" }} ><Button onClick={handleAddCategoryClick}> Kategori Ekle </Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell>adı </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>{u.id}</TableCell>
                                            <TableCell>{u.attributes.name}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Button size="small" onClick={()=>handleUpdateCategoryClick(u)} >güncelle </Button>
                                                    <Button size="small" onClick={()=>handleDeleteCategoryClick(u)}>sil</Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <CategoryDialog
                            isCategoryAdding={isCategoryAdding}
                            isCategoryUpdating={isCategoryUpdating}
                            updatedCategory={updatedCategory}
                            loadCategories={loadCategories}
                            setIsCategoryAdding={setIsCategoryAdding}
                            setIsCategoryUpdating={setIsCategoryUpdating}
                            setUpdatedCategory={setUpdatedCategory}
                            />
                            <DeleteCategoryDialog 
                            isCategoryDeleting= {isCategoryDeleting}
                            deletedCategory ={deletedCategory}
                            loadCategories={loadCategories}
                            onClose={handleCloseDeleteCategoryDialog}
                            />
                        </TableContainer>
                    </Paper>
                </Box>
            </div>
        </div>
    )
}