import React, { useState, useEffect } from 'react';
import { Stack, SxProps, Typography } from '@mui/material';

export interface IRightPanelProps {
  //  tag: string;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
}

export const RightPanel = ({}: /* tag, children, sx, ...rest */ IRightPanelProps) => {
  return (
    <div className='lpan rpan bt bb br'>
      <div className='f1'>
        <div className='f1right'>
          Сейчас
          <br />
          просматривают:
          <br />
          {/* {stat.online} человек */}
          <hr></hr>
          Посещений
          <br />
          за сегодня:
          <br />
          {/* {stat.visitCount} */}
        </div>
      </div>
      <div className='f2'>©LABvsUNI, 2022</div>
    </div>
  );
};
