import { useApp } from '@/app/providers/app/useApp';
import { api } from '@/shared/lib/api';
import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { CustomLoader } from '@/shared/ui/Loader/Loader';

interface User {
  id: null;
  company: object;
  name: string;
  email0: string;
  phone0: string;
  phone_confirmed: boolean;
  email_confirmed: boolean;
  username: string;

  [key: string]: string | number | boolean | object | null;
}

interface CompanyWindowProps {
  user: User;
  setUser: (user: User) => void;
}

export const CompanyWindow = ({ user, setUser }: CompanyWindowProps) => {
  const { notification } = useApp();
  const { data: company, isFetching } = useQuery({
    queryKey: ['company', user.id],
    queryFn: () => api.get(`/outlet/users/${user.id}/company`).then((e) => e.data),
    enabled: !!user?.id
  });
  const defaultCompany = {
    company_name: '',
    address: '',
    inn: '',
    signature: '',
    buyer: '',
    buyer_base: ''
  };
  const [state, setState] = useState(defaultCompany);
  const [changed, setChanged] = useState({});

  const submit = async () => {
    if (!user.id) {
      setUser({ ...user, company: state });
      return;
    }
    await api.put(`${user ? '/erm' : '/external'}/users/${user.id}/company`, { company: state });
    notification.green('Компания обновлена!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setChanged({ ...changed, [e.target.name]: company?.[e.target.name] !== e.target.value });
  };

  useEffect(() => {
    if (company) {
      setState(company);
    }
  }, [company]);

  const cancel = () => {
    setChanged({});
    if (company) {
      setState(company);
    } else {
      setState(defaultCompany);
    }
  };

  if (isFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      <Text ta="center" fz={28} fw={500}>
        Компания
      </Text>
      <Flex direction="column" gap={5}>
        <TextInput name="company_name" value={state?.company_name} label="Компания" onChange={handleChange} />
        <TextInput name="address" value={state?.address} label="Адрес" onChange={handleChange} />
        <TextInput name="inn" value={state?.inn} label="ИНН" onChange={handleChange} />
        <TextInput name="signature" value={state?.signature} label="Подписант" onChange={handleChange} />
        <TextInput name="buyer" value={state?.buyer} label="Покупатель (родительный падеж)" onChange={handleChange} />
        <TextInput name="buyer_base" value={state?.buyer_base} label="На основании" onChange={handleChange} />
      </Flex>
      <Flex gap="sm">
        {Object.values(changed).some((e) => e) && (
          <>
            <Button mt="md" size="sm" color="green" onClick={submit}>
              Сохранить
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
