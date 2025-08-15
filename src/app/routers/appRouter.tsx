import { Route, Routes } from 'react-router';
import { HomePage } from '@/pages/home/page.tsx';
import { LotsPage } from '@/pages/lots/page.tsx';
import { AboutPage } from '@/pages/about/page.tsx';
import { RulesPage } from '@/pages/rules/ui/page.tsx';
import { ProfilePage } from '@/pages/profile/page.tsx';
import { AdminPage } from '@/pages/admin/ui/page.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lots" element={<LotsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};
