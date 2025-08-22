import { api, authurl } from '@/shared/lib/api';
import { IconFileTypePdf, IconX } from '@tabler/icons-react';
import { Text, Flex, Alert, List, Button, Box, FileInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMe } from '@/app/providers/me/useMe';
import { useApp } from '@/app/providers/app/useApp';
import dayjs from 'dayjs';
import { CustomLoader } from '@/shared/ui/Loader/Loader';
import { Loader } from '@mantine/core';

interface User {
  id: null;
  company: object;
  name: string;
  email0: string;
  phone0: string;
  phone_confirmed: boolean;
  email_confirmed: boolean;
  username: string;
  attachments?: Attachment[];
  lawyer_comments?: [string, string][];
  documents_comment?: string;

  [key: string]: string | number | boolean | object | null | undefined;
}

interface DocumentsWindowProps {
  user: User;
  isUserFetching: boolean;
}

interface Attachment {
  id: number,
  path: string;
  filename: string;
}

export const DocumentsWindow = ({ user, isUserFetching }: DocumentsWindowProps) => {
  const { me } = useMe();
  const [state, setState] = useState(user);
  const { notification } = useApp();
  const [loading, setLoading] = useState(false);
  const [attached, setAttached] = useState<File[]>([]);
  const namespace = me.ap_user ? '/erm' : me.outlet ? '/outlet' : '/external';

  useEffect(() => {
    setState(user);
  }, [user]);

  const fileList = state.attachments?.map((doc, i) => {
    return (
      <Button component="a" color="cyan" key={i} size="sm" href={authurl + doc.path} target="_blank">
        <IconFileTypePdf />
        {doc.filename}
      </Button>
    );
  });

  const clearFiles = () => {
    setAttached([]);
  };

  const sendAttached = async () => {
    const fd = new FormData();
    Array.from(attached).forEach((a) => fd.append('user[documents][]', a, a.name));

    try {
      setLoading(true);
      const { data } = await api.patch(`${namespace}/users/${(state || me).id}`, fd);
      notification.green('Успех!');
      setAttached([]);
      setState({ ...state, ...data });
    } catch {
      notification.red('Ошибка!');
    } finally {
      setLoading(false);
    }
  };

  const commentsHistory = ((state || me).lawyer_comments || []).map(([at, body], i) => {
    return (
      <Alert key={i} color="green" mt="sm">
        <Text fw={700} size="sm">
          {dayjs(at).format('DD.MM.YYYY HH:mm')}
        </Text>
        {body}
      </Alert>
    );
  });

  if (isUserFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      <Text ta="center" fz={28} fw={500} mb="md">
        Файлы
      </Text>
      <Flex direction="column" gap={5}>
        <Alert>
          <Flex direction="column" gap="sm">
            <Box>
              <Text size="lg">Перечень необходимых документов для юридических лиц:</Text>
              <List size="sm" withPadding>
                <List.Item>Свидетельство о постановке на налоговый учет;</List.Item>
                <List.Item>
                  Свидетельство о государственной регистрации или Лист записи ЕГРЮЛ о государственной регистрации
                  юридического лица;
                </List.Item>
                <List.Item>Устав (в последней редакции, со всеми изменениями);</List.Item>
                <List.Item>Решение/протокол об избрании или продлении полномочий единоличного исполнительного
                  органа;
                </List.Item>
                <List.Item>Приказ о вступлении в должность генерального директора;</List.Item>
              </List>
            </Box>
            <Box>
              <Text size="lg">Перечень необходимых документов для ИП (индивидуальных предпринимателей):</Text>
              <List size="sm" withPadding>
                <List.Item>
                  Реквизиты паспортных данных - серия, номер, дата выдачи и выдавший орган, дата рождения, код
                  подразделения, адрес
                  регистрации (не скан-копия паспорта!) Просьба прописывать данные реквизиты в Согласии на обработку
                  персональных данных (по
                  форме п. 5);
                </List.Item>
                <Button
                  component="a"
                  color="green"
                  href="https://auth.ap-ru.com/api/v4/external/static_files/51"
                  target="_blank"
                >
                  Скачать бланк
                </Button>
                <List.Item>Уведомление о постановке на налоговый учет;</List.Item>
                <List.Item>Свидетельство ИНН;</List.Item>
                <List.Item>
                  Свидетельство о государственной регистрации в качестве ИП или Лист записи ЕГРИП о регистрации в
                  качестве ИП;
                </List.Item>
                <List.Item>Согласие на обработку персональных данных;</List.Item>
              </List>
            </Box>
          </Flex>
        </Alert>
      </Flex>
      <Flex mt="md" mb="md" gap={10} wrap="wrap">
        {fileList}
      </Flex>
      <Flex w="100%" align="flex-end">
        <FileInput
          onChange={setAttached}
          value={attached}
          label="Выберите файлы:"
          multiple
          flex={1}
        />
        <Button ml="xs" color="red" onClick={clearFiles}>
          <IconX />
        </Button>
      </Flex>
      <Button
        mt="xs"
        mb="md"
        w={170}
        color="green"
        disabled={attached.length === 0 || loading}
        onClick={sendAttached}
      >
        <Flex gap={5} align="center">
          {loading && <Loader color="blue" size="sm" />}
          Отправить
        </Flex>
      </Button>
      {commentsHistory}
      {(state || me).documents_comment && (
        <Alert color="yellow" mt="md">
          <Text mb="xs" fw={600} size="lg">
            Комментарий
          </Text>
          <Text size="sm">{(state || me).documents_comment}</Text>
        </Alert>
      )}
    </>
  );
};
