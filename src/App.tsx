import { CContainer } from '@coreui/react';
import Header from './components/header';
import Table from './components/table';


function App() {
  return (
    <>
      <Header />
      <CContainer fluid >
        <Table />
      </CContainer>
    </>
  );
}

export default App;
