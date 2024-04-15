import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";
import { TableCell, Box, Paper, TableContainer, Table, TableHead, TableRow, Button, TableBody, Switch, FormControlLabel } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const { enqueueSnackbar } = useSnackbar();


    const loadUsers = useCallback(() => {
        axios.get("http://localhost:1337/api/users").then((response) => {
            setUsers(response.data);

        });
    }, []);

    useEffect(() => {
        loadUsers()
    }, [loadUsers])

    const updateUserActivation = useCallback((userId, newIsActive)=>{
         axios.put("http://localhost:1337/api/users/" + userId , {
            isActive : newIsActive,
         }).then(response=>{
            if(response.status===200) {
                loadUsers();
                enqueueSnackbar("Kullanıcı aktivaysonu güncellendi." ,{variant:"success"})
            } else {
                console.log("Hata aldık", response.statusText);
            }
         })
    },[loadUsers])

console.log(users);

    return (
        <div style={{ display: "flex" }}>
            <div>
                <Box style={{ padding: 10 }}>
                    <Paper style={{ width: 700 }}>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Kullanıcılar</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                            <Link to={"/sign-up"}><Button>Kullanıcı Ekle</Button></Link></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Kullanıcı Adı</TableCell>
                                        <TableCell>Adı , Soyadı</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((u) => (
                                        <TableRow key={u.id} >
                                            <TableCell style={{ opacity: u.isActive ? 1 : 0.3 }}>{u.username}</TableCell>
                                            <TableCell style={{ opacity: u.isActive ? 1 : 0.3 }}>{u.name}</TableCell>
                                            <TableCell style={{ opacity: u.isActive ? 1 : 0.3 }}>{u.email}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Button size="small" disabled={!u.isActive} >Güncelle </Button>
                                                    <Button size="small" disabled={!u.isActive} >Sil</Button>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch 
                                                            checked={u.isActive}
                                                            onChange={(e)=>updateUserActivation(u.id ,e.target.checked)}
                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* <CategoryDialog
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
                        /> */}
                        </TableContainer>
                    </Paper>
                </Box>
            </div>
        </div>
    )
}