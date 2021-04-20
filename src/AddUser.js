import React from 'react';
import { Add } from '@material-ui/icons';
import {Button, makeStyles, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {createUser} from './http-provider';


const useStyles = makeStyles(theme => ({
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}));

const AddUser = ({onAdd}) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const classes = useStyles();
    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreateNewUser = async() => {

        const usuario = await createUser(email, password);
        if(email.length == 0) return;
        if(password.length == 0) return;
        setEmail("");
        setPassword("");
        setOpen(false);
        onAdd(usuario.email);
    };
    
    return (
        <>
        <Button
            text = "Add New"
            variant = "outlined"
            startIcon = {<Add/>}
            className = {classes.newButton}
            onClick = {handleClickOpen}
        />
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Crear nuevo usuario</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    onChange={(e)=>setEmail(e.target.value)}
                    margin="dense"
                    id="email"
                    value = {email}
                    label="Email Address"
                    type="email"
                    fullWidth
                />
                <TextField
                    autoFocus={false}
                    onChange={(e)=>setPassword(e.target.value)}
                    margin="dense"
                    id="password"
                    value={password}
                    label="Password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleCreateNewUser} color="primary">
                Create
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default AddUser;