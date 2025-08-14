import { Route, Routes } from 'react-router';
import CompanyWindow from '../../pages/profile/ui/pages/company.tsx';
import DocumentsWindow from '../../pages/profile/ui/pages/documents.tsx';
import MainWindow from '../../pages/profile/ui/pages/main.tsx';
import WonWindow from '../../pages/profile/ui/pages/won.tsx';

const ProfileRouter = () => {
  return (
    <Routes>
      <Route path="/profile/company" element={<CompanyWindow />} />
      <Route path="/profile/documents" element={<DocumentsWindow/>} />
      <Route path="/profile/main" element={<MainWindow/>} />
      <Route path="/profile/won" element={<WonWindow/>} />
    </Routes>
  )
}

export default ProfileRouter;