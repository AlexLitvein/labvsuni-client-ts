import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack, SxProps, TextField, Typography } from '@mui/material';

export interface ILeftPanelProps {
  //  tag: string;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
}

export const LeftPanel = ({}: /* tag, children, sx, ...rest */ ILeftPanelProps) => {
  const [date, setDate] = useState(new Date(Date.now()));
  /* <Stack className='lpan bt bb'> */
  return (
    <Stack
      sx={{
        display: 'none',
        position: 'absolute',
        zIndex: 10,
        width: 200,
        p: 1,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label='Date&Time picker'
          value={date}
          onChange={(value: Dayjs | null, keyboardInputValue?: string | undefined) => {
            console.log(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Stack>
  );
};
