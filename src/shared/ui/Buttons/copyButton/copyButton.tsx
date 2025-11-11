import { CopyButton, ActionIcon } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

interface ApCopyButtonProps {
  value: string;
  variant: string;
}

export const ApCopyButton = ({ value, variant = 'subtle' }: ApCopyButtonProps) => (
  <CopyButton {...{ value }}>
    {({ copied, copy }) => (
      <ActionIcon size={20} variant={variant} color={copied ? 'teal' : 'blue'} onClick={copy}>
        {copied ? <IconCheck /> : <IconCopy />}
      </ActionIcon>
    )}
  </CopyButton>
);
