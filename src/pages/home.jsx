import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Link,
  FormControl,
  InputLabel,
  Select, MenuItem
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import { useBasketContext } from "../context/basket-context";

// "",
// "?sort=price:asc"
// "?sort=price:desc"

export const Home = () => {
  const [products, setProducts] = useState([]);
  const { insertToCart } = useBasketContext();
  const [sort, setSort] = useState("")

  const loadProducts = useCallback(() => {
    axios.get("http://localhost:1337/api/products" + sort).then((response) => {
      setProducts(response.data.data);
      console.log("RESPONSE: ", response.data.image);
    });
  }, [sort]);
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const deneme = useCallback((id) => {
    const selectedProduct = products.find(u => u.id === id);
    const selectedProductInfo = {
      name: selectedProduct.attributes.name,
      id: selectedProduct.id,
      stock: selectedProduct.attributes.stock,
      price: selectedProduct.attributes.price,
      count: 1
    }
    insertToCart(selectedProductInfo);
    console.log(selectedProductInfo);
  }, [products])


  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, padding: 2 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} >
          <InputLabel id="demo-simple-select-autowidth-label">Sırala</InputLabel>
          <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
            value={sort}
            label="Sırala"
            onChange={(e)=>setSort(e.target.value)}
          >
             <MenuItem value={""}>
              <Typography fontSize="16px">Önerilen sıralama</Typography>
            </MenuItem>
            <MenuItem value={"?sort=price:asc"}>
              <Typography fontSize="16px">En düşük fiyat</Typography>
            </MenuItem>
            <MenuItem value={"?sort=price:desc"}>
              <Typography fontSize="16px">En yüksek fiyat</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginLeft: 2, marginTop: 2 }}>
        {products.map((u) => (
          <Card sx={{ width: 270 }}>
            <Link to={`/product/${u.id}`} key={u.id} underline="none" component={RouterLink} >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {u.attributes.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {u.attributes.price} &nbsp;₺
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions>
              <Button onClick={() => deneme(u.id)} sx={{ marginLeft: "auto", width: "100%" }} variant="contained" size="small" color="primary">
                Sepete Ekle
              </Button>
            </CardActions>
          </Card>

        ))}
      </Box>
    </Box>

  )
}