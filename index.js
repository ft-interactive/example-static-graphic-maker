// GET and transform the data
const fs = require('fs');
const d3 = require('d3');
const party = require('g-ukpoliticalparties');
const seatTotals = require('./2017-ge-results.json').seatTotals;

const seatData = Object.keys(seatTotals).map(d=>{
  seatTotals[d].party = d;
  seatTotals[d].colour = party(d).fillColour;
  return seatTotals[d];
})

//  BUILD the graphic BY WHATEVER MEANS NECESSARY!
const radius = 50;
const seatsPieGen = d3.pie()
  .value(d=>d.seats);

const segments = seatsPieGen(seatData);

const path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${radius*2}" height="${radius*2}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g transform="translate(${radius},${radius})">
    ${segments.map( d=> `<path d="${path(d)}" fill="${d.data.colour}"></path>` ).join('')}
  </g>
</svg>`;

// SAVE it to dist
fs.writeFileSync('dist/pie.svg',svg);

// DONE
