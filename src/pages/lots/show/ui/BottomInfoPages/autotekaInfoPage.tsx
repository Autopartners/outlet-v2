import { useMe } from '@/app/providers/me/useMe';
import type { Lot, AutotekaReport } from '@/entities/lot';
import { Flex, Card, Button, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAutotekaReport } from '@/pages/lots/show/api/useAutotekaReport.ts';
import { CustomBanner } from '@/shared/ui/Banners/CustomBanner';

interface AutotekaInfoPageProps {
  lot: Lot;
  editable: boolean;
}

export const AutotekaInfoPage = ({ lot, editable }: AutotekaInfoPageProps) => {
  const lotVin = lot?.vin;
  const lotRegNumber = lot?.vehicle_plate_no;
  const { id } = useParams();
  const { isAdmin } = useMe();
  const filtered = lot?.autoteka_reports.filter((report: AutotekaReport) => report.status === 'success');
  const autotekaReport = filtered?.[filtered.length - 1];

  const { autotekaReportMutation } = useAutotekaReport({ lotId: id, lotVin, lotRegNumber });

  if (!autotekaReport && !editable) { return <CustomBanner label="Отчет автотеки отсутствует" />; }

  return (
    <Flex justify="center">
      <Card w="80%" withBorder>
        <Stack gap="lg" align="center">
          {editable && (
            <CustomBanner
              label='Не нажимайте кнопку "Создать отчет" без надобности. Списывает отчеты в автотеке!'
              title="Предупреждение!"
              color="red"
            />
          )}
          <Flex gap="lg">
            {editable && (
              <Button
                loading={autotekaReportMutation.isPending}
                color="green"
                onClick={() => autotekaReportMutation.mutate()}
                disabled={!!autotekaReport || !isAdmin}
              >
                Создать отчет
              </Button>
            )}
            <Button component="a" href={autotekaReport?.web_link} target="_blank">
                Посмотреть отчет
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Flex>
  );
};