import { ICursorText, INoteParams, IRect } from '../types/types';

export const formatDateStr = (str: string) => {
  // let data = new Date(str);
  let data = dateSubTimeOffset(new Date(str));
  // let dataStr = ('0' + data.getHours()).slice(-2) + '/' + ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear() % 100;
  let dataStr =
    ('0' + data.getDate()).slice(-2) +
    '/' +
    ('0' + (data.getMonth() + 1)).slice(-2) +
    '/' +
    (data.getFullYear() % 100) +
    '-' +
    ('0' + data.getHours()).slice(-2) +
    ':00';
  return dataStr;
};

export function dateSubTimeOffset(date: Date) {
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  return date;
}

export const dateNowSubTimeOffset = () => {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  return date;
};

export const aprox = (v1: number, v2: number, range: number, posInRange: number) => {
  return v1 + ((v2 - v1) * posInRange) / range;
};

export const testPos = (x: number, y: number, rc: IRect) => {
  // const right = this.rcChart.left + this.lnHSeg * this.numHSeg;
  x = x < rc.left ? rc.left : x;
  // x = x > right ? right : x;
  x = x > rc.right ? rc.right : x;

  y = y < rc.top ? rc.top : y;
  y = y > rc.bottom ? rc.bottom : y;
  return { x, y };
};

export const createSvgRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
  return `
      M${x},${y} a${r},${r} 0 0,1 ${r},${-r}
      h${w - (r << 1)} a${r},${r} 0 0,1 ${r},${r}
      v${h - r} a${r},${r} 0 0,1 ${-r},${r}
      h${-w + (r << 1)} a${r},${r} 0 0,1 ${-r},${-r}z
      `;
};

// WARN: для ортогональных линий, ширину использовать кратную 2 пикселям, координаты целочисленные
// Math.trunc(n); лучше отсекать, чем округлять, иначе сумма сегментов иногда
// будет больше отрезка в который они должны уложиться
// умножение на 0.1 вместо деления на 10, порождает много цифр после запятой
export const truncNum = (n: number) => {
  return Math.trunc(n * 10) / 10;
}; // * 0.1

export const getStrBoundSize = (txtRef: React.RefObject<SVGTextElement>, str: string, cls: string) => {
  let bbox = { width: 0, height: 0 };
  if (txtRef.current) {
    txtRef.current.innerHTML = str;
    // this.txtRef.current.setAttribute('class', cls);
    bbox = txtRef.current.getBBox();
  }
  return { width: truncNum(bbox.width), height: truncNum(bbox.height) };
};

export const calcNote = (txtRef: React.RefObject<SVGTextElement>, padding: number, values: ICursorText[]) => {
  const out: INoteParams = { width: 0, height: 0, hStr: 0 };
  values.forEach((el, i) => {
    const sz = getStrBoundSize(txtRef, el.txt, 'note-text');
    out.width = Math.max(out.width, sz.width);
    out.height = sz.height * (i + 1);
    out.hStr = sz.height;
  });

  out.width = out.width + (padding << 1); // добавляем отступы;
  out.height = out.height + (padding << 1);

  return out;
};

export const buildAniPath = (lnHSeg: number, rc: IRect, min: number, max: number, data: number[]) => {
  let res = 'M';
  for (let i = 0; i < data.length; i++) {
    let val = data[i];
    //   val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
    val = truncNum(((val - min) / (max - min)) * (rc.bottom - rc.top));
    // res += `${rc.left + this.lnHSeg * i} ${rc.bottom - val}`;
    res += `${rc.left + lnHSeg * i} ${rc.bottom - val}`;
    if (i < data.length - 1) {
      res += 'L';
    }
  }
  return res;
};
