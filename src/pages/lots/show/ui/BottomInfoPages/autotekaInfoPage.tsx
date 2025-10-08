import { useMe } from '@/app/providers/me/useMe';
import type { Lot, AutotekaReport } from '@/entities/lot';
import { Flex, Card, Button } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAutotekaReport } from '@/pages/lots/show/api/useAutotekaReport.ts';

interface AutotekaInfoPageProps {
  lot: Lot;
  editable: boolean;
}

export const AutotekaInfoPage = ({ lot, editable }: AutotekaInfoPageProps) => {
  const lotVin = lot?.vin;
  const { id } = useParams();
  const { isAdmin } = useMe();
  const filtered = lot?.autoteka_reports.filter((report: AutotekaReport) => report.status === 'success');
  const autotekaReport = filtered?.[filtered.length - 1];

  const { autotekaReportMutation } = useAutotekaReport({ lotId: id, lotVin });

  return (
    <Flex justify="center">
      <Card w="80%" withBorder>
        <Flex gap="lg" justify="center">
          {editable &&
            <Button
              loading={autotekaReportMutation.isPending}
              w="20%"
              color="green"
              onClick={() => autotekaReportMutation.mutate()}
              disabled={!!autotekaReport || !isAdmin}
            >Создать
              отчет</Button>
          }
          {autotekaReport && (
            <Button w="20%" component="a" href={autotekaReport?.web_link} target="_blank">
              Посмотреть отчет
            </Button>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};