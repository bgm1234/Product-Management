import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const PaymentDialog = (props) => {
    const { payment } = props;
   
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(payment);
    }, [payment]);

    const handleCLose = useCallback(() => {
        setOpen(false)
        navigate("/");
    }, [])

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleCLose} >
                <Box sx={{display:"flex" ,flexDirection:"column" , alignItems: "center", justifyContent: "center",mt:20}}>
                    <CheckCircleOutlineIcon style={{ color: "green", fontSize: 100 }} />
                    <Typography sx={{margin:5 , color:"green"}}>Siparişiniz başarıyla oluşturuldu.</Typography>
                    <Button onClick={handleCLose} variant="contained">Tamam</Button>
                </Box>
            </Dialog>
        </div>
    )
}