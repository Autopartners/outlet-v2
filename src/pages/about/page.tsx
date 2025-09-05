import { useApp } from '@/app/providers/app/useApp';
import { Box, Container, Image, Text, Flex, List } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

export const AboutPage = () => {
  const { isMobile } = useApp();

  const facts = [
    'Основана в 2006 году.',
    'Опыт сотрудничества более чем с 200 клиентами и управления более 12000 автомобилей',
    'Общий парк более 7000 автомобилей',
    'Устойчивое финансовое положение и стабильность'
  ];

  return (
    <Container fluid p={0} mb={50}>
      <Box pos="relative" h={isMobile ? 800 : 620}>
        <Image
          src="/office_q1.jpg"
          w="100%"
          h="100%"
          style={{
            zIndex: 1,
            objectFit: 'cover',
            objectPosition: isMobile ? 'left' : 'center'
          }}
        />

        {/* Indigo overlay */}
        <Box
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          c="white"
          left={0}
          style={{
            backgroundColor: 'rgba(63, 81, 181, 0.3)', // indigo light
            textAlign: 'center',
            zIndex: 2
          }}
        />
        <Box
          w="80vw"
          pos="absolute"
          top="45%"
          left="50%"
          c="white"
          style={{ transform: 'translate(-50%, -50%)', zIndex: 2 }}
        >
          <Flex direction="column" justify="center" align="center">
            <Text ta="center" fz={40} fw="bold">
              АВТО ПАРТНЕРС
            </Text>

            <Flex direction="column" align="flex-start" gap={10} mt={10}>
              {facts.map((text, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0, 0, 0, 0.3)"
                  w="100%"
                  p={4}
                  style={{ borderRadius: 4 }}
                >
                  <Flex gap="xs">
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <IconStar size={24} color="white" />
                    </Box>
                    <Text fz={24} c="white" style={{ flex: 1 }}>{text}</Text>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Flex justify="center" mt={50}>
        <Box w="70vw">
          <Flex direction="column" gap={15}>
            <Text>Компания Auto Partners предоставляет широкий спектр решений по эффективному управлению автопарком
              клиента
              на
              всей территории Российской Федерации. В зависимости от актуальных потребностей клиента, мы рады предложить
              следующие пакеты сервисов:
            </Text>
            <Flex justify="center">
              <List w="95%">
                <List.Item>
                  Операционную аренду автомобилей (аренда с полным сервисным обслуживанием)
                </List.Item>
                <List.Item>
                  Возвратная аренда (выкуп существующего автопарка компании и последующая сдача в операционную
                  аренду)
                </List.Item>
                <List.Item>
                  Флит-менеджмент (управление корпоративными автопарками)
                </List.Item>
                <List.Item>
                  Средне- и краткосрочная аренда автомобилей.
                </List.Item>
              </List>
            </Flex>
            <Text>Компания Auto Partners имеет 17-ти летний опыт успешной работы в сфере флит-аутсорсинга за пределами
              Российской Федерации. Российское подразделение было основано в 2006 году, и с тех пор клиентами Auto
              Partners
              стали многие крупные международные компании, которые оценивают нас как очень надежного партнера.
            </Text>
            <Text>Головной офис Auto Partners находится в Москве, полное покрытие территории страны осуществляется с
              помощью
              региональных подразделений компании, которые функционируют в 8 крупных городах России:
            </Text>
            <Flex justify="center">
              <List w="95%">
                <List.Item>Санкт-Петербург</List.Item>
                <List.Item>Нижний Новгород</List.Item>
                <List.Item>Самара</List.Item>
                <List.Item>Краснодар</List.Item>
                <List.Item>Екатеринбург</List.Item>
                <List.Item>Новосибирск</List.Item>
                <List.Item>Иркутск</List.Item>
                <List.Item>Владивосток</List.Item>
              </List>
            </Flex>
            <Text>Компания Auto Partners обладает серьезным опытом в сфере операционной аренды. В данный момент под
              управлением команды профессионалов Auto Partners находится более 6000 автомобилей в России. Концентрируясь
              на
              потребностях и задачах клиента, мы ответственно и внимательно относимся к каждому в нашем автопарке.
            </Text>
            <Text>Для получения более подробной информации о компании Auto Partners и о доступных услугах в рамках
              флит-аутсорсинга - пожалуйста, обращайтесь в отдел продаж Auto Partners по тел. +7(495)780-52-54 или
              sales@ap-ru.com
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
