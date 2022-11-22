import React, { useState, useEffect } from 'react';
import { Stack, SxProps, Typography } from '@mui/material';
import { ISensData } from '../types/dtos';
import CurrSensDataCard from './CurrSensData';
import { hdrFontBorder } from '../mui/theme';

export interface IHeaderProps {
  currSensData: ISensData;
  onUpdate: () => void;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
}

export const Header = ({ currSensData, onUpdate }: IHeaderProps) => {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'end', p: 1, backgroundColor: '#3bc3e3' }}>
      <Typography
        sx={{
          mr: '-1.3em',
          mb: '0.9em',
          ml: '-1.5em',
          lineHeight: '1em',
          textAlign: 'end',
          transform: 'rotate(-90deg)',
        }}
      >
        Погода&nbsp;в
        <br />
        городе
      </Typography>
      <Typography sx={{ fontSize: '4rem', pl: '0.14em', ml: '-0.13em', lineHeight: '0.8em', borderBottom: 8 }}>
        Ю
      </Typography>
      <Stack sx={{ ml: '0.7em', borderBottom: 8, flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between' }}>
        <span style={{ flexGrow: 1, marginLeft: '-0.21em', fontSize: '4rem', lineHeight: '1em' }}>рга</span>
      </Stack>
      <CurrSensDataCard currSensData={currSensData} onUpdate={onUpdate} />
    </Stack>
  );
};
