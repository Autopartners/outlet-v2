import { Anchor, Box, Button, Container, Divider, Flex, Image, Stack, Text } from '@mantine/core';
import { useApp } from '@/app/providers/app/useApp';

export const Footer = () => {
  const year = new Date().getFullYear();
  const { isMobile } = useApp();

  return (
    <Container size={isMobile ? '100%' : 1600}>
      <Divider size="sm" style={{ borderRadius: 20 }} />
      <Box my={30}>
        <Flex align="flex-start" justify="space-between" direction={{ base: 'column', sm: 'row' }}>
          <Flex gap={30} justify={{ base: 'space-between', sm: 'start' }} w={{ base: '100%', sm: 'fit-content' }}>
            <Anchor href="https://ap-ru.com" target="_blank" rel="noopener noreferrer">
              <Image src="/ap_logo.png" w={150} />
            </Anchor>
            <Button color="red.9" fz={12} size="compact-sm" component="a" href="https://ap-ru.com/ru/contacts/" target="_blank">
              Линия доверия
            </Button>
          </Flex>
          <Flex gap={50} mt={{ base: 20, sm: 0 }}>
            <Stack gap={3}>
              <Anchor c="black" href="mailto:info@ap-ru.com" fz={14}>INFO@AP-RU.COM</Anchor>
              <Anchor c="black" href="mailto:remarketing@ap-ru.com" fz={14}>REMARKETING@AP-RU.COM</Anchor>
            </Stack>
            <Stack gap={3}>
              <Anchor c="black" href="tel:+78003336300" fz={14}>+7 (800) 333-63-00</Anchor>
              <Anchor c="black" href="tel:+74957805254" fz={14}>+7 (495) 780-52-54</Anchor>
            </Stack>
          </Flex>
        </Flex>
        <Flex
          ta="center"
          mt={20}
          align="center"
          justify="space-between"
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 10, sm: 0 }}
        >
          <Text fz={14}>
            ©
            {' '}
            {year}
            {' '}
            ООО «АВТО ПАРТНЕРС». Все права защищены.
          </Text>
          <Text fz={14}>ООО «АВТО ПАРТНЕРС», 129090, Россия, Москва, Олимпийский проспект, 14</Text>
          <Anchor c="black" td="underline" target="_blank" fz={14} href="https://ap-ru.com/cookie">
            Политика использования файлов Cookies
          </Anchor>
        </Flex>
      </Box>
    </Container>
  );
};