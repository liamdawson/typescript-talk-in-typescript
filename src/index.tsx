import * as keycode from 'keycode';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Presentation from './Presentation';

const nextKeys = [
  keycode.codes.down,
  keycode.codes["page down"],
  keycode.codes.right,
  keycode.codes.space,
];
const prevKeys = [
  keycode.codes.left,
  keycode.codes["page up"],
  keycode.codes.up,
  keycode.codes.backspace,
];

ReactDOM.render(
  <Presentation nextKeyCodes={nextKeys} prevKeyCodes={prevKeys} />,
  document.getElementById('root') as HTMLElement
);
