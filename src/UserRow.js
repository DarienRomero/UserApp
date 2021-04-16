import React from 'react';

const UserRow = ({id, email}) => (
    <tr key={id}>
        <td>{id}</td>
        <td>{email}</td>
    </tr> 
)

export default UserRow;