import { CButton, CContainer } from '@coreui/react';
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Dialog from './components/record-dialog';
import Table from './components/table';
import userCollection from './services/firebase.config';


function App() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    const getUsers = async () => {
      const docs = await getDocs(userCollection);
      const retrievedUsers: Record<string, User> = {};
      docs.forEach(doc => {
        retrievedUsers[doc.id] = doc.data();
      });
      setUsers(retrievedUsers);
    }
    getUsers();
  }, []);

  const handleAddUserClick = () => setDialogOpen(true);

  const renderRecordDialog = (): JSX.Element => <Dialog isOpen={dialogOpen} setOpen={setDialogOpen} users={users} setUsers={setUsers} isCreate={true} />

  return (
    <>
      <Header />
      <CContainer fluid >
        <CButton variant="outline" className="addUserBtn" onClick={handleAddUserClick}>
          + Add User
        </CButton>
        {renderRecordDialog()}
        <Table users={users} />
      </CContainer>
    </>
  );
}

export default App;
