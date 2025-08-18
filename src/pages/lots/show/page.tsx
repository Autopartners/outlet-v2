import { Card, Container, Grid } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useLot } from '@/pages/lots/index/api/useLots.ts';
import { Loader } from '@/shared/ui/Loader/Loader.tsx';

export const LotPage = () => {
  const { id } = useParams();
  const { error, isLoading } = useLot({ id: id });
  const nav = useNavigate();

  if (error) { nav('/lots') }
  if (isLoading) { return (<Loader />); }

  return (
    <Container size={'xl'}>
      <Card withBorder w={'100%'}>
        <Grid>
          <Grid.Col
            span={6}
            style={{ gridRow: '1 / 6', }}
          >

          </Grid.Col>

          <Grid.Col
            span={6}
            style={{ gridRow: '1 / 2', }}
          >
          </Grid.Col>

          <Grid.Col
            span={6}
            style={{ gridRow: '2 / 5', }}
          >
          </Grid.Col>

          <Grid.Col
            span={6}
            style={{ gridRow: '5 / 6', }}
          >
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  )
};
