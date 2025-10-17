import { api } from '@/shared/lib/api';
import { isEmail } from '@/shared/lib/isEmail';

const emailCheck = async (email: string, setErr: (errors: string) => void, user_id: number | null) => {
  if (!user_id) { return null; }

  if (!isEmail(email)) {
    setErr('Неверный формат Email');
    return;
  }
  const { data } = await api.get('external/users/email_exist', { params: { email0: email, from_user_id: user_id } });
  setErr(data && 'Пользователь с таким email уже зарегистрирован');
};

export default emailCheck;
