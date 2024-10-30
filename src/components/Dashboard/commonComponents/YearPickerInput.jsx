import { useState } from 'react';
import dayjs from 'dayjs';
import { Calendar } from '@mantine/dates';
import { rem } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { MonthPickerInput } from '@mantine/dates';

export function YearPickerInput() {
  const [selected, setSelected] = useState([]);

  // Remove type annotations for JavaScript
  const [value, setValue] = useState(null); 
  const icon = <IconCalendar />;

  const handleSelect = (date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
    if (isSelected) {
      setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  return (
    <MonthPickerInput
      leftSection={icon}
      leftSectionPointerEvents="none"
      
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}

export default YearPickerInput;
