import React, { useState, useEffect } from 'react';

import { Box, Button, Fade, Paper, Popper, Stack, SxProps, TextField, Typography } from '@mui/material';
import { ChatRangeControls } from './ChatRangeControls';
import { Calendar, Info } from './media';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { IRequest } from '../types/types';

export interface IControlPanelProps {
  date: Date;
  range: number;
  onDate: (startData: Date, range: number) => void;
  //  children?: React.ReactNode[];
}

export const ControlPanel = ({ date, range, onDate }: IControlPanelProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  // const [range, setRange] = useState(1);
  // let [req, set_req] = useState<IRequest>({ startData: new Date('2022-01-01'), endData: new Date('2022-01-02') });
  // let [startData, set_startData] = useState(new Date('2022-01-08'));
  let [startData, set_startData] = useState(date);

  // const onAddDate = (add: number) => {

  //   set_req((prev) => {
  //     const dt = new Date(prev.date);
  //     dt.setDate(dt.getDate() + add);
  //     const out = { ...prev, date: dt };
  //     onDate(out);
  //     return out;
  //   });
  // };

  // const handleClick =
  // (newPlacement: PopperPlacementType) =>
  // (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen((prev) => placement !== newPlacement || !prev);
  //   setPlacement(newPlacement);
  // };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const onDateSelect = (date: Date) => {
    setOpen(false);
    set_startData((prev) => {
      // const out = createReq(date, range);

      //      const newEnd = new Date(startData);
      // newEnd.setDate(newEnd.getDate() + range);

      onDate(date, range);
      return date;
    });
  };

  // const createReq = (startData: Date, range: number) => {
  //   // const newStart = new Date(startData);
  //   // newStart.setDate(newStart.getDate());

  //   const newEnd = new Date(startData);
  //   newEnd.setDate(newEnd.getDate() + range);

  //   return { startData: startData, endData: newEnd } as IRequest;
  // };

  return (
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
      <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
        {/* {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>            
          </Fade>
        )} */}
        {/* <LeftPanel date={req.startData} onDate={onDateSelect} /> */}
        <LeftPanel date={startData} onDate={onDateSelect} />
      </Popper>

      {/* <Stack direction='row' className='ctrls-left-wrp'> */}
      <Button variant='contained' sx={{ height: '100%' }} onClick={handleClick}>
        {Calendar}
      </Button>
      {/* <LeftPanel/>        */}
      {/* </Stack> */}

      <ChatRangeControls
        range={range}
        onSelRange={(r) => {
          // setRange(r);
          onDate(startData, r);
        }}
        onClickArrow={(addDays: number) => {
          set_startData((prev) => {
            const newData = new Date(prev);
            newData.setDate(newData.getDate() + addDays);
            onDate(newData, range);
            return newData;
          });
        }}
      />

      {/* <div className='ctrls-right-wrp'> */}
      <Button variant='contained' sx={{ height: '100%' }}>
        {Info}
      </Button>
      {/* <RightPanel/> */}
      {/* </div> */}
    </Stack>
  );
};
