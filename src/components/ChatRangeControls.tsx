import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  SxProps,
  Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from './media';

export interface IChatRangeControlsProps {
  range: number;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
  onSelRange: (range: number) => void;
  onClickArrow: (addDays: number) => void;
}

export const ChatRangeControls = ({ range, onSelRange, onClickArrow }: IChatRangeControlsProps) => {
  // const [range, setRange] = useState(1);

  return (
    <ButtonGroup variant='contained' aria-label='outlined primary button group'>
      <Button onClick={(e) => onClickArrow(-range)}>
        {/* <SvgIcon viewBox='0 0 100 100'>
          <use xlinkHref={'./media/snowflake.svg#arrowright'} transform='scale(-1 1) translate(-100 0)'></use>
        </SvgIcon> */}
        {ArrowLeft}
      </Button>
      <FormControl size='small' sx={{ width: 120 }}>
        <InputLabel id='lab-range'>Период</InputLabel>
        <Select
          // variant='filled'
          labelId='lab-range'
          label='Период'
          id='sel-range'
          value={range}
          // onChange={(e: SelectChangeEvent<number>) => setRange(Number(e.target.value))}
          onChange={(e: SelectChangeEvent<number>) => onSelRange(Number(e.target.value))}
        >
          <MenuItem value={1}>1 день</MenuItem>
          <MenuItem value={7}>7 дней</MenuItem>
          <MenuItem value={30}>30 дней</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={(e) => onClickArrow(range)}>
        {ArrowRight}
        {/* <SvgIcon viewBox='0 0 100 100'>
          <use xlinkHref={'./media/snowflake.svg#arrowright'}></use>
        </SvgIcon> */}
      </Button>
    </ButtonGroup>
  );
};
