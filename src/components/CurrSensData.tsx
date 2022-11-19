import React from 'react';
import { ISensData } from '../types/dtos';
import { Stack, Typography } from '@mui/material';
import { Snowflake } from './media';

export interface ICurrSensDataCardProps {
  currSensData: ISensData;
}

const CurrSensDataCard = ({ currSensData }: ICurrSensDataCardProps) => {
  const rotate = () => {
    let a = 0;
    return (e: { currentTarget: { style: { transform: string } } }) => {
      e.currentTarget.style.transform = `rotate(${(a -= 360)}deg)`;
      // props.fetchDataFu(new Date(Date.now()), 1);
    };
  };

  return (
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack sx={{ flexDirection: 'row', mr: 1, borderBottom: 8 }}>
        <span style={{ fontSize: '4rem', lineHeight: '1em' }}>{currSensData.t}</span>
        <Stack sx={{ transformOrigin: '16px 16px', transitionDuration: '1s', cursor: 'pointer' }} onClick={rotate()}>
          {Snowflake}
        </Stack>
      </Stack>
      <Typography sx={{ pl: 1, borderLeft: 8 }}>
        Сейчас
        <br />
        В: {Math.trunc(currSensData.h)} %
        <br />
        Д: {Math.trunc(currSensData.p)} мм
      </Typography>
    </Stack>
  );
};

export default CurrSensDataCard;
