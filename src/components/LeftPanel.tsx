import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack, SxProps, TextField, Typography } from '@mui/material';
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';

export interface ILeftPanelProps {
  date: Date;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
  onDate: (date: Date) => void;
}

export const LeftPanel = ({ date, onDate }: ILeftPanelProps) => {
  // const [date, set_date] = useState(new Date(Date.now()));

  // const [date, set_date] = React.useState<Dayjs | null>(dayjs('2022-01-01')); // 2014-08-18T21:11:54

  const handleChange = (newValue: Dayjs | null) => {
    // set_date(newValue);
    onDate(newValue?.toDate() || new Date(Date.now()));
    // console.log({
    //   newValue_log: newValue?.toDate(),
    // });
  };
  /* <Stack className='lpan bt bb'> */
  return (
    <Stack
      sx={{
        // display: 'none',
        // position: 'absolute',
        // zIndex: 10,
        width: 200,
        height: 400,
        p: 1,
        borderTop: 8,
        borderBottom: 8,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DatePicker
          label='Выберите даты'
          value={date}
          onChange={(value: Dayjs | null, keyboardInputValue?: string | undefined) => {
            console.log(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <DesktopDatePicker
          label='Выберите дату'
          inputFormat='DD/MM/YYYY'
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Stack>
  );
};
