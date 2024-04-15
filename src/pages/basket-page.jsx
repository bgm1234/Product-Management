import React from "react";
import { Button, ButtonGroup, Card, Grid, Table, TableCell, TableHead, TableRow, Typography ,Link } from "@mui/material"
import { useBasketContext } from "../context/basket-context";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink } from 'react-router-dom';

export const BasketPage = () => {
    const { basketCount, products , removeFromBasket ,increaseProductCount ,decreaseProductCount } = useBasketContext();
    

    const basketTotal = products.reduce((acc,item) => acc + (item.count * item.price) , 0)
    console.log(basketTotal);
    console.log(products);
    return (
        <Grid container style={{ marginTop: 50, marginLeft: 10 }} spacing={2}>
            <Grid item xs={12} md={9}>
                <Typography variant="h6" gutterBottom>Sepetim ( {basketCount} ürün )</Typography>
                {products.map((u) => (
                    <Table key={u.id}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Link href={`/product/${u.id}`}>
                                    <img src="https://www.cihatayaz.com/wp-content/uploads/2017/06/kitap-okuma-aliskanligi_212766.gif"
                                        style={{ width: '70px', height: '70px' }}></img>
                                    </Link>     
                                </TableCell>
                                <TableCell style={{width:300}}>{u.name}</TableCell>
                                <TableCell >
                                    <ButtonGroup size="small">
                                        <Button disabled={u.count===1} onClick={()=>decreaseProductCount(u)}>-</Button>
                                        <Button disabled> {u.count}</Button>
                                        <Button  disabled={u.count>= u.stock} onClick={()=>increaseProductCount(u)}>+</Button>
                                    </ButtonGroup>
                                </TableCell>
                                <TableCell>{u.price}&nbsp;₺</TableCell>
                                <TableCell>
                                    <IconButton onClick={()=>removeFromBasket(u)}>
                                        <DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>

                ))}

            </Grid>
            <Grid item xs={12} md={2}>
                <Card style={{ border: '1px solid #ccc', borderRadius: '8px', width: 250, height: 400 , marginLeft:20}}>
                    <Typography style={{ textAlign: "center", marginTop: 15 }}>Sipariş Özeti</Typography>
                    <Typography style={{ marginLeft: 10, marginTop: 10 }} variant="body2">Ürünün toplamı : {basketTotal} &nbsp;₺ </Typography>
                    <Link component={RouterLink} to={"/payment"}>
                    <Button disabled={!basketTotal} sx={{ marginLeft: "auto", width: "100%", marginTop: 33 }} variant="contained" size="small" color="primary">Sepeti Onayla</Button>
                    </Link>
                </Card>
            </Grid>
        </Grid>
    )
}