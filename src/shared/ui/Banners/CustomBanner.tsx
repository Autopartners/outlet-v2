import { Alert, type AlertProps, Text } from '@mantine/core';

type CustomBannerProps = AlertProps & {
  label: string;
};

export const CustomBanner = ({ label, ...props }: CustomBannerProps) => (
  <Alert w="fit-content" color="gray" mx="auto" {...props}>
    <Text ta="center" px={20}>{label}</Text>
  </Alert>
);