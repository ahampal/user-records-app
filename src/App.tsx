import { CButton, CContainer } from '@coreui/react';
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Dialog from './components/record-dialog';
import Table from './components/table';
import userCollection from './services/firebase.config';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';


function App() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<Record<string, UserWithRef>>({});

  useEffect(() => {
    const getUsers = async () => {
      const docs = await getDocs(userCollection);
      const retrievedUsers: Record<string, UserWithRef> = {};
      docs.forEach(doc => {
        retrievedUsers[doc.id] = { ...doc.data(), docRef: doc.ref }
      });
      setUsers(retrievedUsers);
    }
    getUsers();
  }, []);

  const handleAddUserClick = () => setDialogOpen(true);

  const renderRecordDialog = (): JSX.Element => <Dialog isOpen={dialogOpen} setOpen={setDialogOpen} users={users} setUsers={setUsers} />

  return (
    <>
      <Header />
      <CContainer fluid >
        <CButton variant="outline" className="addUserBtn" onClick={handleAddUserClick}>
          <CIcon icon={cilPlus} size="sm" className='input' style={{ marginRight: '5px' }} />
          Add User
        </CButton>
        {renderRecordDialog()}
        <Table users={users} setUsers={setUsers} />
      </CContainer>
    </>
  );
}

export default App;
