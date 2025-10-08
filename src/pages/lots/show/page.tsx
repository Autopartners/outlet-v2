import { Container, Grid, Card } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useLot } from '@/pages/lots/index/api/useLots.ts';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader.tsx';
import { useMe } from '@/app/providers/me/useMe.ts';
import { useApp } from '@/app/providers/app/useApp.ts';
import { LotHeader } from '@/pages/lots/show/ui/ShowPage/LotHeader.tsx';
import { LotImageGallery } from '@/shared/ui/Images/LotImageGallery.tsx';
import { LotTabs } from '@/pages/lots/show/ui/ShowPage/LotTabs.tsx';
import { LotBiddingSection } from '@/pages/lots/show/ui/ShowPage/LotBiddingSection.tsx';
import { LotInfoSections } from '@/pages/lots/show/ui/ShowPage/LotInfoSections.tsx';
import { useGalleryItems } from '@/pages/lots/show/ui/useGalleryItems.tsx';
import { LoadError } from '@/shared/ui/Banners/LoadError.tsx';

export const LotPage = ({ mode = 'view' }: { mode?: 'view' | 'edit' }) => {
  const { id } = useParams();
  const { lot, error, isLoading } = useLot({ id });
  const { isAdmin, isRemarketing } = useMe();
  const { isMobile } = useApp();
  const nav = useNavigate();
  const { items, ref, custom } = useGalleryItems({ mode, lot });

  if (isLoading) { return <CustomLoader label="Загружаем информацию о лоте..." />; }
  if (error) { return <LoadError error={error} mt={50} />; }
  if (!lot) { return null; }

  const editable = mode === 'edit' && (isAdmin || isRemarketing);

  return (
    <Container size={isMobile ? '100%' : '70%'} miw={isMobile ? 0 : 1600} mt={40}>
      <LotHeader lot={lot} editable={editable} onClose={() => nav('/lots')} />
      <Card bg="gray.1" withBorder w="100%" radius={0} style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card withBorder radius="md" p={0} maw="100%">
              <LotImageGallery items={items} galleryRef={ref} renderCustomControls={custom} />
            </Card>
          </Grid.Col>
          {!editable && <LotBiddingSection lot={lot} />}
        </Grid>
        {!editable && <LotInfoSections lot={lot} />}
      </Card>
      <LotTabs lot={lot} editable={editable} />
    </Container>
  );
};
