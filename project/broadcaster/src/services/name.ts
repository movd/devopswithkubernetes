/* 
Inspiration source: <https://gist.github.com/tkon99/4c98af713acc73bed74c>
(c) by Thomas Konings
Random Name Generator for Javascript
Adapted to typescript and star wars by github.com/movd
*/

export const generateName = (): string => {
  const squadrons = [
    'ace',
    'alphabet',
    'black',
    'blue',
    'bravo',
    'gold',
    'red',
    'rogue',
  ];
  const callsigns = [
    'eight',
    'five',
    'four',
    'leader',
    'nine',
    'one',
    'seven',
    'six',
    'ten',
    'three',
    'two',
  ];

  const squadron = squadrons[Math.floor(Math.random() * squadrons.length)];
  const callsign = callsigns[Math.floor(Math.random() * callsigns.length)];

  return `${squadron}_${callsign}`;
};
