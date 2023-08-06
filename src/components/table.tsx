import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell
} from '@coreui/react';
import React, { useState, useEffect } from 'react';
import db from '../services/firebase.config';
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';

const converter = {
    toFirestore: (data: User) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as User
};

const userCollection = collection(db, 'users').withConverter(converter);

const Table = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const docs = await getDocs(userCollection);
            const retrievedUsers: User[] = [];
            docs.forEach(doc => {
                retrievedUsers.push(doc.data());
            });
            setUsers(retrievedUsers);
        }
        getUsers();
    }, []);

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
                    {users && users.length > 0 && users.map(user => (
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