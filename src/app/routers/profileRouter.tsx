import { Route, Routes } from 'react-router';
import { CompanyWindow } from '../../pages/profile/ui/pages/company.tsx';
import { DocumentsWindow } from '../../pages/profile/ui/pages/documents.tsx';
import { MainWindow } from '../../pages/profile/ui/pages/mainWindow.tsx';
import { WonWindow } from '../../pages/profile/ui/pages/won.tsx';
import type { Me } from '@/app/types/me';


interface ProfileRouterProps {
  user: Me;
  setUser: (user: Me) => void;
  isUserFetching: boolean;
}

export const ProfileRouter = ({ user, setUser, isUserFetching }: ProfileRouterProps) => {
  return (
    <Routes>
      <Route path="/company" element={<CompanyWindow {...{ user, setUser, isUserFetching }} />} />
      <Route path="/documents" element={<DocumentsWindow {...{ user, isUserFetching }} />} />
      <Route path="/main" element={<MainWindow {...{ user, setUser, isUserFetching }} />} />
      <Route path="/won" element={<WonWindow />} />
    </Routes>
  );
};
