import { Box, Flex, Card } from '@mantine/core';

export const AutotekaInfoPage = () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', 'ВАШ_CLIENT_ID');
  params.append('client_secret', 'ВАШ_CLIENT_SECRET');

  fetch('https://pro.autoteka.ru/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  return (
    <Flex justify="center">
      <Card w="80%" withBorder>
        <Box>Автотека</Box>
      </Card>
    </Flex>
  );
};