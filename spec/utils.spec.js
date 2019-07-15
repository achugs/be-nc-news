const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when passed an array', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('returns an array with the sql timestamp changed to js when passed an array', () => {
    const input = 
  });
});

describe('makeRefObj', () => { });

describe('formatComments', () => { });
