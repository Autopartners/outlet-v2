import { Button, NumberInput, Loader as MantineLoader } from '@mantine/core';
import { useBid, type useBidParams } from '@/pages/lots/show/api/useBid.ts';
import { useState } from 'react';
import type { Lot } from '@/entities/lot';

interface MakeBidInputProps {
  lot: Lot,
  bidMutationParams: useBidParams
}

export const MakeBidInput = ({ lot, bidMutationParams }:MakeBidInputProps) => {
  const { bidMutation } = useBid(bidMutationParams);
  const [bid, setBid] = useState<string | number | undefined>('');

  return (
    <>
      <NumberInput
        max={100000000}
        size="lg"
        w={{ base: '100%', sm: '60%' }}
        placeholder="Ставка"
        allowDecimal={false}
        allowNegative={false}
        thousandSeparator={' '}
        value={bid}
        onChange={setBid}
        disabled={bidMutation.status === 'pending'}
        step={100000}
      />
      <Button
        onClick={() => {
          bidMutation.mutate({ value: bid, lot_id: lot.id })
          setBid('');
        }}
        color="green.7"
        size="lg"
        disabled={!bid || Number(bid) < (lot.second_stage_minimal_price ?? 0)}
        w={{ base: '100%', sm: '35%' }}
        leftSection={bidMutation.status === 'pending' && <MantineLoader type="dots" color="gray.6" />}
      >
        Отправить
      </Button>
    </>
  )
}