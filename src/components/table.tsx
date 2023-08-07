import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButtonGroup,
    CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { useState } from 'react';
import Dialog from './record-dialog';
import { deleteDoc } from 'firebase/firestore';


type Prop = {
    users: Record<string, UserWithRef>
    setUsers: React.Dispatch<React.SetStateAction<Record<string, UserWithRef>>>
}

const Table = ({ users, setUsers }: Prop) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserWithRef>();
    const [rerender, setRerender] = useState(false);

    const renderRecordDialog = (): JSX.Element => (
        <Dialog
            isOpen={dialogOpen}
            setOpen={setDialogOpen}
            users={users}
            setUsers={setUsers}
            updateUser={selectedUser}
        />
    )

    const deleteUser = async (user: UserWithRef) => {
        await deleteDoc(user.docRef)
        delete users[user.docRef.id]
        setUsers(users)
        setRerender(!rerender)
    }

    const renderOptions = (user: UserWithRef) => {
        return (
            <>
                <CButtonGroup size="sm" role="group" aria-label="Large button group">
                    <CButton className="optionBtn" variant="ghost" onClick={() => {
                        setSelectedUser(user)
                        setDialogOpen(true)
                    }}>
                        <CIcon icon={cilPencil} size="sm" className='input' />
                    </CButton>
                    <CButton className="optionBtn" variant="ghost" onClick={() => deleteUser(user)}>
                        <CIcon icon={cilTrash} size="sm" className='input' />
                    </CButton>
                </CButtonGroup>

            </>
        )
    }
    return (
        <>
            <CTable bordered className='table'>
                <CTableHead >
                    <CTableRow>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                        <CTableHeaderCell scope="col">City</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {users && Object.values(users).length > 0 && Object.values(users).map(user => (
                        <CTableRow>
                            <CTableHeaderCell scope="row">{user.name}</CTableHeaderCell>
                            <CTableDataCell>{user.birth_date && user.birth_date.toDate().toDateString()}</CTableDataCell>
                            <CTableDataCell>{user.country && user.country.label}</CTableDataCell>
                            <CTableDataCell>{user.city && user.city.label}</CTableDataCell>
                            <CTableDataCell>{renderOptions(user)}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            {renderRecordDialog()}
        </>
    )
};

export default Table;