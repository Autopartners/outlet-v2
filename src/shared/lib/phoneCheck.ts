import { api } from '@/shared/lib/api';
import { AsYouType } from 'libphonenumber-js';

const phoneCheck = async (value: string, setErr: (errors: string) => void, user_id: number | null) => {
  if (!user_id) { return null; }

  const number = new AsYouType('RU');
  number.input(value);
  const isNumber = number.getNumber()?.isValid();

  const err = [];
  if (isNumber) {
    const { data } = await api.get(
      'external/users/phone_exist',
      { params: { phone0: number.getChars().replace('+', ''), from_user_id: user_id } },
    );
    if (data) { err.push('Пользователь с таким номером телефона уже зарегистрирован'); }
  } else {
    err.push('Некорректный номер телефона');
  }
  setErr(err.join(', '));
};

export default phoneCheck;
