import { Center, Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '@/app/providers/app/useApp.ts';
import { topScroll } from '@/shared/lib/ScrollToTop';

interface LotPagesProps {
  pages: number;
  pos: string;
}

export const LotPages = ({ pages, pos }: LotPagesProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useApp();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    topScroll();
    if (page === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(page));
    }
    setSearchParams(searchParams);
  };

  return (
    <Center mt={pos === 'top' ? 80 : 30} mb={pos === 'bottom' ? 40 : 30}>
      <Pagination
        hideWithOnePage
        total={pages}
        value={currentPage}
        onChange={handlePageChange}
        size="lg"
        radius="lg"
        gap={4}
        siblings={isMobile ? 0 : 1}
        color="blue.7"
      />
    </Center>
  );
};
