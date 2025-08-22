import { Route, Routes } from 'react-router';
import { CompanyWindow } from '../../pages/profile/ui/pages/company.tsx';
import { DocumentsWindow } from '../../pages/profile/ui/pages/documents.tsx';
import { MainWindow } from '../../pages/profile/ui/pages/mainWindow.tsx';
import { WonWindow } from '../../pages/profile/ui/pages/won.tsx';

interface User {
  id: null;
  company: object;
  name: string;
  email0: string;
  phone0: string;
  phone_confirmed: boolean;
  email_confirmed: boolean;
  username: string;

  [key: string]: string | number | boolean | object | null;
}

interface ProfileRouterProps {
  user: User;
  setUser: (user: User) => void;
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
