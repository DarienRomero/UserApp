import React from 'react';
import { ArrowForwardIos } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const UserRow = ({id, email, onItemSelected}) => (
    <tr key={id}>
        <td>{id}</td>
        <td>{email}</td>
        <td>
            <IconButton 
                aria-label="delete"
                onClick = {(e)=>{
                    onItemSelected(id)
                }}
            >
                
                <ArrowForwardIos />
            </IconButton>
        </td>
    </tr> 
)

export default UserRow;