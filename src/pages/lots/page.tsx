import { useMe } from '@/app/providers/me/useMe.ts';
import { useNavigate } from 'react-router-dom';
import { LotsFilters } from '@/pages/lots/ui/lotsFilters.tsx';
import { LotsList } from '@/pages/lots/ui/lotsList.tsx';

export const LotsPage = () => {
  const { me } = useMe();
  const nav = useNavigate();

  if (!me.id) { nav('/'); }
  return (
    <>
      <LotsFilters/>
      <LotsList />
    </>
  )
};
