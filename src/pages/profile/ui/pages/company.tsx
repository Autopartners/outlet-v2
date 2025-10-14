import { useApp } from '@/app/providers/app/useApp';
import { api } from '@/shared/lib/api';
import { Button, Flex, Loader, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader';
import type { Me, Company } from '@/entities/me';


interface CompanyWindowProps {
  user: Me;
  setUser: (user: Me) => void;
  isUserFetching: boolean;
}

export const CompanyWindow = ({ user, setUser, isUserFetching }: CompanyWindowProps) => {
  const { notification } = useApp();
  const defaultCompany = {
    company_name: '',
    address: '',
    inn: '',
    signature: '',
    buyer: '',
    buyer_base: ''
  };
  const [state, setState] = useState(defaultCompany);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState({});

  const submit = async () => {
    try {
      setLoading(true);
      await api.put(`/erm/users/${user.id}/company`, { company: state });
      setUser({ ...user, company: state });
      notification.green('Компания обновлена!');
      setChanged({});
    } catch {
      notification.red('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setState(user.company ?? defaultCompany);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof Company; value: string };

    setState({ ...state, [name]: value });
    setChanged({ ...changed, [name]: user?.company?.[name] !== value });
  };

  const cancel = () => {
    setChanged({});
    setState(user?.company || defaultCompany);
  };

  if (isUserFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      <Text ta="center" fz={28} fw={500}>
        Компания
      </Text>
      <Flex direction="column" gap={5}>
        <TextInput name="company_name" value={state?.company_name} label="Компания" onChange={handleChange} />
        <TextInput name="address" value={state?.address} label="Юридический адрес" onChange={handleChange} />
        <TextInput name="inn" value={state?.inn} label="ИНН" onChange={handleChange} />
        <TextInput name="signature" value={state?.signature} label="Подписант" onChange={handleChange} />
        <TextInput
          name="buyer"
          value={state?.buyer}
          label="Покупатель (родительный падеж)"
          onChange={handleChange}
        />
        <TextInput name="buyer_base" value={state?.buyer_base} label="На основании" onChange={handleChange} />
      </Flex>
      <Flex gap="sm">
        {Object.values(changed).some((e) => e) && (
          <>
            <Button w={150} mt="md" size="sm" color="green" onClick={submit} disabled={loading}>
              <Flex gap={5} align="center">
                {loading && <Loader color="blue" size="sm" />}
                Сохранить
              </Flex>
            </Button>
            <Button mt="md" size="sm" onClick={cancel}>
              Отменить
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};
