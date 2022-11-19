import React, { useState, useEffect } from 'react';

import { Box, Button, Stack, SxProps, TextField, Typography } from '@mui/material';
import { ChatRangeControls } from './ChatRangeControls';
import { Calendar, Info } from './media';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export interface IControlPanelProps {
  //  tag: string;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
}

export const ControlPanel = ({}: /* tag, children, sx, ...rest */ IControlPanelProps) => {
  //   const [date, setDate] = useState(new Date(Date.now()));

  const onAddDate = (add: number) => {
    // setDate((prev) => {
    //   const dt = new Date(prev);
    //   dt.setDate(dt.getDate() + add);
    //   //   fetchData(dt, range);
    //   return dt;
    // });
  };

  return (
    // sx={{...sx, }} {...rest}
    <Stack
      direction='row'
      sx={{
        borderLeft: 8,
        py: 1,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Stack direction='row' className='ctrls-left-wrp'>
        <Button variant='contained' sx={{ height: '100%' }}>
          {Calendar}
        </Button>
        {/* <LeftPanel/>        */}
      </Stack>

      <ChatRangeControls
        onClick={function (range: number): void {
          onAddDate(range);
        }}
      />

      <div className='ctrls-right-wrp'>
        <Button variant='contained' sx={{ height: '100%' }}>
          {Info}
        </Button>
        {/* <RightPanel/> */}
      </div>
    </Stack>
  );
};
