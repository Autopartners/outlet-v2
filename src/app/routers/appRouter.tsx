import { Route, Routes } from 'react-router';
import { HomePage } from '@/pages/home/page.tsx';
import { LotsPage } from '@/pages/lots/index/page.tsx';
import { AboutPage } from '@/pages/about/page.tsx';
import { RulesPage } from '@/pages/rules/ui/page.tsx';
import { ProfilePage } from '@/pages/profile/page.tsx';
import { LotPage } from '@/pages/lots/show/page.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lots" element={<LotsPage />} />
      <Route path="/lots/:id" element={<LotPage mode="view" />} />
      <Route path="/lots/:id/edit" element={<LotPage mode="edit" />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/profile/*" element={<ProfilePage />} />
    </Routes>
  );
};
