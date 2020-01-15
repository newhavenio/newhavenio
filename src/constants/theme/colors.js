export const Whites = {
  100: '#FFFFFF',
};

// There is no black for now, but it should be off-black.
// export const Blacks = {
//    100: '#000000',
// };

export const Grays = {
  100: '#50606C',
  60: '#969696',
  30: '#DEDDDA',
  20: '#EBEFF3',
  10: '#F0EDEB',
  8: '#F2F1F0',
};

export const Oranges = {
  100: '#FC6612',
  60: '#FF7B1A',
  30: '#FF961A',
  20: '#FFA632',
  10: '#FFC066',
  8: '#FFD999',
};

export const Blues = {
  100: '#386688',
  60: '#4E7EA0',
  30: '#6B99BB',
  20: '#8EB0CC',
  10: '#C0D1E0',
  8: '#EBEFF3',
};

export const Gradients = {
  Orange: `linear-gradient(100deg, ${Oranges[100]} 1%, ${Oranges[60]} 46%, ${Oranges[30]} 95%);`,
  Blue: `linear-gradient(50deg, ${Blues[100]} 1%, ${Blues[60]} 46%, ${Blues[30]} 95%);`,
  Gray: `linear-gradient(293deg, ${Grays[30]} 1%, ${Grays[10]} 46%, ${Grays[8]} 95%);`,
};
