import { SvgIcon } from '@mui/material';
import icons from '../media/icons.svg';
import { hdrFontBorder } from '../mui/theme';
// import { ReactComponent as r1 } from 'media/logo.svg';

const getIcon = (nameFile: string, nameIcon: string, vbox: number, fill: string) => {
  return (
    <SvgIcon viewBox={`0 0 ${vbox} ${vbox}`} style={{ width: 32, height: 32, fill: `${fill}` }}>
      <use xlinkHref={`${nameFile}#${nameIcon}`} />
    </SvgIcon>
  );
};

const i1 = getIcon(icons, 'refresh', 100, hdrFontBorder);
const i2 = getIcon(icons, 'arrowright', 100, hdrFontBorder);
const i3 = getIcon(icons, 'calendar', 100, hdrFontBorder);
const i4 = getIcon(icons, 'info', 100, hdrFontBorder);

export { i1 as Snowflake, i2 as ArrowRight, i3 as Calendar, i4 as Info };
