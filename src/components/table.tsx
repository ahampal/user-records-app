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


type Prop = {
    users: Record<string, User>
}

const Table = ({ users }: Prop) => {
    const renderOptions = () => {
        return (
            <>
                <CButtonGroup size="sm" role="group" aria-label="Large button group">
                    <CButton className="optionBtn" variant="ghost">
                        <CIcon icon={cilPencil} size="sm" className='input' />
                    </CButton>
                    <CButton className="optionBtn" variant="ghost">
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
                            <CTableDataCell>{user.birth_date.toDate().toDateString()}</CTableDataCell>
                            <CTableDataCell>{user.country.label}</CTableDataCell>
                            <CTableDataCell>{user.city.label}</CTableDataCell>
                            <CTableDataCell>{renderOptions()}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    )
};

export default Table;