import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

export const DetailDialog = (props) => {
    const { isDetailing, detailProduct, onClose } = props;
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setOpen(isDetailing);
    }, [isDetailing]);

    const handleClose = useCallback(() => {
        setOpen(false);
        onClose();
    }, [onClose])
    return (
        <div>
            <Dialog
                style={{minWidth:100}}
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle> {detailProduct?.attributes?.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{width:400}} id="alert-dialog-slide-description">
                   {detailProduct?.attributes?.detail}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Kapat</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}