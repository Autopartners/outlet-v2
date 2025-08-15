import { Select } from '@mantine/core';
import { useState } from 'react';
import type { DictionaryItem } from '@/shared/api/useDictionary.ts';

interface FilterSelectProps {
    label: string;
    data?: DictionaryItem[];
    value: string | null;
    onChange: (v: string | null) => void;
    disabled?: boolean;
}

export const FilterSelect = ({ label, data, value, onChange, disabled }: FilterSelectProps) => {
  const [search, setSearch] = useState<string | undefined>();

  return (
    <Select
      label={label}
      data={data || []}
      value={value}
      onChange={onChange}
      searchable
      searchValue={search}
      onSearchChange={setSearch}
      clearable
      disabled={disabled}
    />
  );
};
