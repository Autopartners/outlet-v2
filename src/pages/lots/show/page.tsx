import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container, Divider,
  Flex,
  Grid,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useLot } from '@/pages/lots/index/api/useLots.ts';
import { Loader } from '@/shared/ui/Loader/Loader.tsx';
import { ApCarousel } from '@/shared/ui/apCarousel.tsx';
import { IconCarCrash, IconCarGarage, IconClipboard, IconClock, IconSettings, IconX } from '@tabler/icons-react';
import { useState } from 'react';

const stepsData = [
  { value: '1000', label: '1 000' },
  { value: '5000', label: '5 000' },
  { value: '10000', label: '10 000' },
  { value: '50000', label: '50 000' }
]

interface renderVehicleInfoParams {
    head: string;
    info: string;
}

export const LotPage = () => {
  const { id } = useParams();
  const { lot, error, isLoading } = useLot({ id: id });
  const nav = useNavigate();
  const [step, setStep] = useState<string | null>('1000');
  const [activeInfoPage, setActiveInfoPage] = useState<'kit'|'damages'|'tos'>('kit');

  if (error) { nav('/lots') }
  if (isLoading || !lot) { return <Loader /> }

  const isEnd = new Date(lot.end_at) < new Date()

  const renderVehicleInfo = ({ head, info }:renderVehicleInfoParams) => (
    <Stack gap={0}>
      <Text fz={14} c={'gray.7'}>{head}</Text>
      <Text fz={18}>{info}</Text>
    </Stack>
  )

  return (
    <Container size={'xl'}>
      <Card bg={'blue.5'} radius={0} style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} mt={40}>
        <Flex align={'center'} justify={'space-between'} px={10}>
          <Text fw='bold' c={'white'} fz={25}>{lot.vehicle_name}, {lot.year}г.</Text>
          <Flex gap={10}>
            <ActionIcon size={'lg'}>
              <IconSettings onClick={() => nav(`/backoffice/lots/${id}`)} />
            </ActionIcon>
            <ActionIcon size={'lg'}>
              <IconX onClick={() => nav('/lots')} />
            </ActionIcon>
          </Flex>
        </Flex>
      </Card>
      <Card withBorder w={'100%'} radius={0} display={'grid'}>
        <Grid p={10}>
          <Grid.Col
            span={7}
            style={{
              display: 'grid',
              gridRow: 'span 5',
            }}
          >
            <Card withBorder radius={'md'} p={0}>
              <ApCarousel h={500} pictures={lot.sales_pictures} />
            </Card>
          </Grid.Col>

          <Grid.Col span={5}>
            <Box h={'20%'}>
              <Card radius={'lg'} bg={'blue.5'}>
                <Text ta={'center'} fz={25} c={'white'} fw={'bold'}>{lot.code}</Text>
              </Card>
            </Box>

            <Box h={'60%'}>
              <Card radius={'lg'} bg={'gray.1'}>
                <Stack>
                  <Flex justify={'space-between'} align={'flex-end'}>
                    <Text fz={20}>Текущая ставка</Text>
                    <Text fz={25} fw={'bold'}>{lot.last_bid.toLocaleString('ru-RU')}₽</Text>
                  </Flex>
                  <Flex justify={'space-between'} align={'flex-end'}>
                    <Text fz={20}>Ваша ставка</Text>
                    <Text fz={25} fw={'bold'} c={!lot.my_last_bid ? 'red.5' : 'blue.5'}>
                      {lot.my_last_bid?.toLocaleString('ru-RU') || 0}₽
                    </Text>
                  </Flex>
                  {!isEnd ? (
                    <Card bg={'red.1'} radius={'lg'} p={10}>
                      <Text c={'red.9'} ta={'center'} fw={'bold'} fz={20}>Аукцион уже завершен</Text>
                    </Card>
                  ) : (
                    <Stack>
                      <Flex justify={'space-between'} align={'flex-end'}>
                        <NumberInput
                          size={'lg'}
                          w={'60%'}
                          placeholder={'Ставка'}
                          allowDecimal={false}
                          allowNegative={false}
                          min={lot.last_bid}
                          step={Number(step)}
                          thousandSeparator={' '}
                        />
                        <Button color={'green'} size={'lg'} w={'35%'} >Отправить</Button>
                      </Flex>
                      <Select
                        data={stepsData}
                        size={'md'}
                        label={'Шаг ставки'}
                        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                        value={step}
                        onChange={setStep}
                        allowDeselect={false}
                        w={'fit-content'}
                      />
                    </Stack>
                  )}
                </Stack>
              </Card>
            </Box>

            <Box h={'20%'}>
              <Card radius={'lg'} bg={'blue.5'}>
                <Flex justify={'space-between'} px={20}>
                  <Text fz={16} c={'white'}>
                    {(new Date(lot.start_at)).toLocaleDateString('ru-RU')} - {(new Date(lot.end_at)).toLocaleDateString('ru-RU')}
                  </Text>
                  <Flex gap={10}>
                    <IconClock color={'white'} />
                    <Text fz={16} c={'white'}>{isEnd ? 'Завершен' : 'Идет'}</Text>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          </Grid.Col>
        </Grid>

        <Card bg={'gray.1'} mx={10} mt={10}>
          <SimpleGrid cols={4} px={10}>
            <Stack>
              {renderVehicleInfo({ head: 'Марка', info: lot.vehicle.brand_name })}
              {renderVehicleInfo({ head: 'КПП', info: lot.vehicle.vehicle_submodel.gearbox.name })}
              {renderVehicleInfo({ head: 'Кузов', info: lot.vehicle.vehicle_submodel.body_type.name })}
            </Stack>
            <Stack>
              {renderVehicleInfo({ head: 'Модель', info: lot.vehicle.vehicle_model_name })}
              {renderVehicleInfo({ head: 'Пробег', info: lot.km.toLocaleString('ru-RU') + ' км' })}
              {renderVehicleInfo({ head: 'Город', info: lot.vehicle.city_of_remarketing_name })}
            </Stack>
            <Stack>
              {renderVehicleInfo({ head: 'Тип топлива', info: lot.vehicle.vehicle_submodel.fuel_type.name })}
              {renderVehicleInfo({ head: 'Гос. номер', info: lot.vehicle.vehicle_plate_no })}
              {renderVehicleInfo({ head: 'VIN', info: lot.vehicle.vin })}
            </Stack>
            <Stack>
              {renderVehicleInfo({ head: 'Г. В.', info: lot.year + 'г.' })}
            </Stack>
          </SimpleGrid>
        </Card>

        <Flex justify={'space-between'} px={10} mt={20}>
          {renderVehicleInfo({ head: 'Адрес', info: lot.address })}
          {renderVehicleInfo({ head: 'Телефон', info: '8 (800) 333-63-00' })}
        </Flex>
      </Card>

      <Flex bg={'blue.5'} w={'100%'} h={70} align={'center'} justify={'space-between'} px={100}>
        <Stack gap={2}>
          <Flex gap={10} align={'center'} style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('kit')}>
            <IconClipboard color={'white'} />
            <Text c={'white'} fz={20}>Комплектация</Text>
          </Flex>
          {activeInfoPage === 'kit' && <Divider size={2} color={'white'}/>}
        </Stack>
        <Stack gap={2}>
          <Flex gap={10} align={'center'} style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('damages')}>
            <IconCarCrash color={'white'} />
            <Text c={'white'} fz={20}>Повреждения</Text>
          </Flex>
          {activeInfoPage === 'damages' && <Divider size={2} color={'white'}/>}
        </Stack>
        <Stack gap={2}>
          <Flex gap={10} align={'center'} style={{ cursor: 'pointer' }} onClick={() => setActiveInfoPage('tos')}>
            <IconCarGarage color={'white'} />
            <Text c={'white'} fz={20}>ТО</Text>
          </Flex>
          {activeInfoPage === 'tos' && <Divider size={2} color={'white'}/>}
        </Stack>
      </Flex>
    </Container>
  )
};
