import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell
} from '@coreui/react';


type Prop = {
    users: Record<string, User>
}

const Table = ({ users }: Prop) => {
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
                            <CTableDataCell></CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    )
};

export default Table;