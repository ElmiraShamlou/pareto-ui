import React from 'react';
import { Grid, Button, Modal, TextField } from '@mui/material';

export default function Dashboard(props) {

    const styles = {
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {props.input ? 

            <Grid container sx={styles.modalStyle} spacing={1}>
                        
            <Grid item xs={12}>
                <TextField
                    required
                    variant="standard"
                    id="margin-none"
                    label={props.textLabel}
                    value={props.text}
                    onChange={props.handleEditText}
                    fullWidth
                />
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
                <Button onClick={props.handleSave} variant={props.buttonVariant} color={props.buttonColor}>{props.buttonText}</Button>
            </Grid>
            </Grid>

            :
            <Grid container sx={styles.modalStyle} spacing={1}>
            <Grid item xs={12}>
                <p>{props.text}</p>
            </Grid>
            {props.hasTwoButtons ? 
            <>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
                <Button fullWidth onClick={props.handleButtonTwoClick} variant={props.buttonTwoVariant} color={props.buttonTwoColor}>{props.buttonTwoText}</Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <Button fullWidth onClick={props.handleSave} variant={props.buttonVariant} color={props.buttonColor}>{props.buttonText}</Button>
            </Grid>
            <Grid item xs={1}></Grid>
            </> 
            : 
            <>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Button fullWidth onClick={props.handleSave} variant={props.buttonVariant} color={props.buttonColor}>{props.buttonText}</Button>
            </Grid>
            <Grid item xs={3}></Grid>
            </>}
            
            </Grid>
            }
            
        </Modal>
    );

}


