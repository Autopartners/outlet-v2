import { Button, Flex, InputBase, Text, TextInput } from '@mantine/core';
import { api } from '@/shared/lib/api.ts';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useApp } from '@/app/providers/app/useApp';
import { CustomLoader } from '@/shared/ui/CustomLoader/CustomLoader';
import { ConfirmWithTimer } from '@/widgets/ConfirmWithTimer/ui/ConfirmWithTimer';
import type { Me } from '@/entities/me';
import { initialMe } from '@/entities/me';
import { IMaskInput } from 'react-imask';
import phoneCheck from '@/shared/lib/phoneCheck';
import { useMe } from '@/app/providers/me/useMe';
import emailCheck from '@/shared/lib/emailCheck';

interface MainWindowProps {
  user: Me;
  setUser: (user: Me) => void;
  isUserFetching: boolean;
}

export const MainWindow = ({ user, setUser, isUserFetching }: MainWindowProps) => {
  const nav = useNavigate();
  const { isMobile } = useApp();
  const [state, setState] = useState(user);
  const [stateLastName, stateName, stateMiddleName] = state.name.split(' ');
  const [name, setName] = useState(stateName || '');
  const [lastName, setLastName] = useState(stateLastName || '');
  const [middleName, setMiddleName] = useState(stateMiddleName || '');
  const [changed, setChanged] = useState({});
  const [phoneError, setPhoneError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const { me } = useMe();
  const { notification } = useApp();

  useEffect(() => {
    setState(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setChanged({
      ...changed,
      [e.target.name]: user[e.target.name] !== e.target.value
    });
  };
  const handleChangePhone = (e: string) => {
    setState({ ...state, phone0: e });
    setChanged({
      ...changed,
      phone0: user.phone0 !== e
    });
  };

  const submit = async () => {
    const { email0, phone0 } = state;
    const sendName = [lastName, name, middleName].join(' ').trim();
    try {
      const { data } = await api.patch(`common/users/${user.id}`, {
        user: {
          name: sendName,
          email0,
          phone0
        }
      });
      setState({ ...state, ...data });
      setUser({ ...state, ...data });
      setChanged({});
      notification.green('Сохранено!');
    } catch {
      notification.red('Ошибка!');
    }
  };

  const cancel = () => {
    setState(user);
    setName(stateName || '');
    setMiddleName(stateMiddleName || '');
    setLastName(stateLastName || '');
    setChanged({});
  };

  const logout = async () => {
    try {
      await api.post(`common/users/${user.id}/logout`);
      setUser(initialMe);
      nav('/');
    } catch {
      notification.red('Ошибка!');
    }
  };

  if (isUserFetching) {
    return <CustomLoader />;
  }

  const isEdit = Object.values(changed).some((e) => e);

  return (
    <>
      <Text ta="center" fz={28} fw={500}>
        Основное
      </Text>
      <Flex direction="column" gap={5}>
        <TextInput name="username" value={state.username} label="Логин" disabled />

        {/* FIO */}
        {[
          { name: 'last_name', label: 'Фамилия', setState: setLastName, value: lastName, state: stateLastName },
          { name: 'name', label: 'Имя', setState: setName, value: name, state: stateName },
          { name: 'middle_name', label: 'Отчество', setState: setMiddleName, value: middleName, state: stateMiddleName },
        ].map(input => (
          <TextInput
            name={input.name}
            value={input.value}
            label={input.label}
            withAsterisk={!input.value && input.name !== 'middle_name'}
            onChange={e => {
              const newVal = e.target.value.replace(/[^а-яА-ЯёЁ]/g, '');
              input.setState(newVal);
              setChanged({ ...changed, [e.target.name]: input.state !== newVal });
            }}
          />
        ))}

        {/* Phone and Email */}
        <Flex
          gap="md"
          align={isMobile ? 'flex-start' : 'flex-end'}
          direction={isMobile ? 'column' : 'row'}
          justify={{ base: 'space-between', sm: 'flex-start' }}
        >
          <InputBase
            component={IMaskInput}
            mask="+{7} (000) 000-00-00"
            prepare={(str: string, masked: { value: string; }) => {
              if (str === '8' && (masked.value === '+7' || masked.value === '')) { return ''; }
              if (str === '7' && (masked.value === '+7' || masked.value === '')) { return ''; }
              if (str === '' && masked.value === '') { return '7'; }
              if (!/^\+?[\d\s\-()]+$/.test(str) && masked.value === '') { return '7'; }
              if (!/^\+?[\d\s\-()]+$/.test(str)) { return ''; }
              return str;
            }}
            w={isMobile ? '100%' : '40%'}
            name="phone0"
            value={state.phone0}
            label={state.phone_confirmed ? 'Мобильный телефон' : 'Мобильный телефон (не подтвержден)'}
            onAccept={(e) => handleChangePhone(e)}
            onBlur={() => phoneCheck(state.phone0, setPhoneError, me.id)}
            withAsterisk={!state.phone0}
            error={phoneError}
          />
          {!phoneError && !isEdit && <ConfirmWithTimer type="phone" label="Телефон" user={state} setUser={setState} />}
        </Flex>
        <Flex
          gap="md"
          align={isMobile ? 'flex-start' : 'flex-end'}
          direction={isMobile ? 'column' : 'row'}
          justify={{ base: 'space-between', sm: 'flex-start' }}
        >
          <TextInput
            name="email0"
            value={state.email0}
            withAsterisk={!state.email0}
            label={state.email_confirmed ? 'Email' : 'Email (не подтвержден)'}
            onChange={handleChange}
            w={isMobile ? '100%' : '40%'}
            onBlur={() => emailCheck(state.email0, setEmailError, me.id)}
            error={emailError}
          />
          {!emailError && !isEdit && <ConfirmWithTimer type="email" label="Email" user={state} setUser={setState} />}
        </Flex>
      </Flex>

      {/* Buttons */}
      {isEdit && (
        <Flex gap={isMobile ? 0 : 'sm'} direction={isMobile ? 'column' : 'row'}>
          <Button
            mt="md"
            size="sm"
            color="green"
            disabled={!lastName || !name || !!phoneError || !!emailError}
            onClick={submit}
            w={{ sm: 200 }}
          >
            Сохранить
          </Button>
          <Button mt="md" size="sm" onClick={cancel} w={{ sm: 200 }} variant="default">
            Отменить
          </Button>
        </Flex>
      )}

      <Button mt={50} fullWidth={isMobile} size="sm" color="red" onClick={logout}>
        Выйти из аккаунта
      </Button>
    </>
  );
};
