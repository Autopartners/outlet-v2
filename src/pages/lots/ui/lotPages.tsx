import { Center, Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '@/app/providers/app/useApp.ts';

interface LotPagesProps {
    pages: number;
    pos: string
}

export const LotPages = ({ pages, pos }: LotPagesProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useApp()

  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(page));
    }
    setSearchParams(searchParams);
  };

  return (
    <Center mt={pos === 'top' ? 40 : 20} mb={pos === 'bottom' ? (isMobile ? 100 : 40) : 20}>
      <Pagination
        total={pages}
        value={currentPage}
        onChange={handlePageChange}
        size="lg"
        radius="lg"
        gap={4}
        siblings={isMobile ? 0 : 1}
        color={'blue.4'}
      />
    </Center>
  );
};
