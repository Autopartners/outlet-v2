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
  const [state, setState] = useState<Company>({
    company_name: '',
    address: '',
    inn: '',
    signature: '',
    buyer: '',
    buyer_base: ''
  });
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
    setState({
      company_name: user.company?.company_name ?? '',
      address: user.company?.address ?? '',
      inn: user.company?.inn ?? '',
      signature: user.company?.signature ?? '',
      buyer: user.company?.buyer ?? '',
      buyer_base: user.company?.buyer_base ?? ''
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof Company; value: string };

    setState(prev => ({ ...prev, [name]: value }));
    setChanged(prev => ({ ...prev, [name]: user?.company?.[name] !== value }));
  };

  const cancel = () => {
    setChanged({});
    setState({
      company_name: user.company?.company_name ?? '',
      address: user.company?.address ?? '',
      inn: user.company?.inn ?? '',
      signature: user.company?.signature ?? '',
      buyer: user.company?.buyer ?? '',
      buyer_base: user.company?.buyer_base ?? ''
    });
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
        <TextInput
          name="company_name"
          value={state?.company_name}
          label="Компания"
          onChange={handleChange}
          withAsterisk={!state?.company_name.trim()}
        />
        <TextInput
          name="address"
          value={state?.address}
          label="Юридический адрес"
          onChange={handleChange}
          withAsterisk={!state?.address.trim()}
        />
        <TextInput
          name="inn"
          value={state?.inn}
          label="ИНН"
          onChange={handleChange}
          withAsterisk={!state?.inn.trim()}
        />
        <TextInput
          name="signature"
          value={state?.signature}
          label="Подписант"
          onChange={handleChange}
          withAsterisk={!state?.signature.trim()}
        />
        <TextInput
          name="buyer"
          value={state?.buyer}
          label="Покупатель (родительный падеж)"
          onChange={handleChange}
          withAsterisk={!state?.buyer.trim()}
        />
        <TextInput
          name="buyer_base"
          value={state?.buyer_base}
          label="На основании"
          onChange={handleChange}
          withAsterisk={!state?.buyer_base.trim()}
        />
      </Flex>
      <Flex gap="sm">
        {Object.values(changed).some((e) => e) && state.company_name.trim() &&
          state.address.trim() &&
          state.inn.trim() &&
          state.signature.trim() &&
          state.buyer.trim() &&
          state.buyer_base.trim() && (
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
