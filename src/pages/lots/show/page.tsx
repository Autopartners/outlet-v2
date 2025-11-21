import { Container, Grid, Card } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useLot } from '@/shared/api/useLots.ts';
import { useMe } from '@/app/providers/me/useMe.ts';
import { useApp } from '@/app/providers/app/useApp.ts';
import { LotHeader } from '@/pages/lots/show/ui/ShowPage/LotHeader.tsx';
import { LotImageGallery } from '@/shared/ui/Images/LotImageGallery.tsx';
import { LotTabs } from '@/pages/lots/show/ui/ShowPage/LotTabs.tsx';
import { LotBiddingSection } from '@/pages/lots/show/ui/ShowPage/LotBiddingSection.tsx';
import { LotInfoSections } from '@/pages/lots/show/ui/ShowPage/LotInfoSections.tsx';
import { useGalleryItems } from '@/pages/lots/show/ui/useGalleryItems.tsx';
import { LoadError } from '@/shared/ui/Banners/LoadError.tsx';
import { LotEditSubmodel } from '@/pages/lots/show/ui/EditPage/LotEditSubmodel.tsx';
import { LotShowSkeleton } from '@/pages/lots/show/ui/LotShowSkeleton';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader';

export const LotPage = ({ mode = 'view' }: { mode?: 'view' | 'edit' | 'history' }) => {
  const { id } = useParams();
  const { lot, error, isLoading } = useLot({ id });
  const { isAdmin, isRemarketing } = useMe();
  const { isMobile } = useApp();
  const nav = useNavigate();
  const { items, ref, custom } = useGalleryItems({ mode, lot });

  if (isLoading) {
    return (
      <>
        <LotShowSkeleton />
        <CustomLoader label="Загружаем информацию о лоте"/>
      </>
    );
  }
  if (error) { return <LoadError error={error} mt={50} />; }
  if (!lot) { return null; }

  const editable = mode === 'edit' && (isAdmin || isRemarketing);
  const isHistory = mode === 'history';
  const isWinner = lot.is_winner;

  return (
    <Container size={isMobile ? '100%' : '70%'} miw={isMobile ? 0 : 1600} mt={40}>
      <LotHeader lot={lot} editable={editable} isWinner={isWinner} onClose={() => nav('/lots')} />
      <Card bg="gray.1" withBorder w="100%" radius={0} style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card withBorder radius="md" p={0} maw="100%">
              <LotImageGallery items={items} galleryRef={ref} renderCustomControls={custom} />
            </Card>
          </Grid.Col>
          {editable && <LotEditSubmodel lot={lot} />}
          {!editable && <LotBiddingSection lot={lot} isHistory={isHistory} isWinner={isWinner} />}
        </Grid>
        {!editable && <LotInfoSections lot={lot} isHistory={isHistory} isWinner={isWinner} />}
      </Card>
      <LotTabs lot={lot} editable={editable} />
    </Container>
  );
};
