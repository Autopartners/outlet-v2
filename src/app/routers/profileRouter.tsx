import { Route, Routes } from 'react-router';
import CompanyWindow from '../../pages/profile/ui/pages/company.tsx';
import DocumentsWindow from '../../pages/profile/ui/pages/documents.tsx';
import { MainWindow } from '../../pages/profile/ui/pages/mainWindow.tsx';
import WonWindow from '../../pages/profile/ui/pages/won.tsx';

export const ProfileRouter = ({ user, setUser }) => {
  return (
    <Routes>
      <Route path="/company" element={<CompanyWindow user={user} />} />
      <Route path="/documents" element={<DocumentsWindow user={user} />} />
      <Route path="/main" element={<MainWindow {...{ user, setUser }} />} />
      <Route path="/won" element={<WonWindow user={user} />} />
    </Routes>
  );
};
