import { IconFlagCheck, IconLoader, IconPercentage100, IconPercentage33, IconPercentage66 } from '@tabler/icons-react';

export const stageStrings = {
  'preparing': 'Подготовка',
  'first_stage': 'Этап 1',
  'second_stage': 'Этап 2',
  'third_stage': 'Этап 3',
  'finished': 'Закончен'
};
export const stageIcons = {
  'preparing': <IconLoader size={20} />,
  'first_stage': <IconPercentage33 size={20} />,
  'second_stage': <IconPercentage66 size={20} />,
  'third_stage': <IconPercentage100 size={20} />,
  'finished': <IconFlagCheck size={20} />
};