import { CButton, CContainer } from '@coreui/react';
import { useState } from 'react';
import Header from './components/header';
import Dialog from './components/record-dialog';
import Table from './components/table';


function App() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleAddUserClick = () => setDialogOpen(true);

  const renderRecordDialog = (): JSX.Element => <Dialog isOpen={dialogOpen} setOpen={setDialogOpen} isCreate={true} />

  return (
    <>
      <Header />
      <CContainer fluid >
        <CButton variant="outline" className="addUserBtn" onClick={handleAddUserClick}>
          + Add User
        </CButton>
        {renderRecordDialog()}
        <Table />
      </CContainer>
    </>
  );
}

export default App;
