import { Route, Routes } from 'react-router';
import { HomePage } from '@/pages/home/page.tsx';
import { LotsPage } from '@/pages/lots/index/page.tsx';
import { AboutPage } from '@/pages/about/page.tsx';
import { RulesPage } from '@/pages/rules/ui/page.tsx';
import { ProfilePage } from '@/pages/profile/page.tsx';
import { LotPage } from '@/pages/lots/show/page.tsx';
import { LotEditPage } from '@/pages/lots/edit/page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lots" element={<LotsPage />} />
      <Route path="/lots/:id" element={<LotPage />} />
      <Route path="/lots/:id/edit" element={<LotEditPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/profile/*" element={<ProfilePage />} />
    </Routes>
  );
};
