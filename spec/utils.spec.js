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
    const input = [{
      created_at: 1542284514171
    }]
    const expected = [{
      created_at: new Date(1542284514171)
    }]
    expect(formatDates(input)).to.eql(expected);
  });
  it('returns an array of objects with timestamp changed to js', () => {
    const input = [{
      created_at: 1542284514171
    }, { created_at: 1416140514171 }]
    const expected = [{
      created_at: new Date(1542284514171)
    }, { created_at: new Date(1416140514171) }]
    expect(formatDates(input)).to.eql(expected);
  });
  it('returns an array of objects with timestamp changed to js with other elements added to the objects', () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      created_at: 1542284514171

    },
    {
      title: 'Sony Vaio; or, The Laptop',
      created_at: 1416140514171,
    },
    {
      title: 'Eight pug gifs that remind me of mitch',
      created_at: 1289996514171
    }]
    const expected = [{
      title: 'Living in the shadow of a great man',
      created_at: new Date(1542284514171)

    },
    {
      title: 'Sony Vaio; or, The Laptop',
      created_at: new Date(1416140514171),
    },
    {
      title: 'Eight pug gifs that remind me of mitch',
      created_at: new Date(1289996514171)
    }]
    expect(formatDates(input)).to.eql(expected);
  });
});

describe('makeRefObj', () => {
  it('returns an empty array when passed an empty array', () => {
    expect(makeRefObj([])).to.eql([]);
  });
  it('returns an object with they key of article_id changed to the titles value when pased an array', () => {
    const input = [{ article_id: 1, title: 'Student SUES Mitch!' }];
    const output = { 'Student SUES Mitch!': 1 };
    expect(makeRefObj(input)).to.eql(output);
  });
  it('returns objects with they key of article_id changed to the titles value returns an array', () => {
    const input = [{ article_id: 1, title: 'Student SUES Mitch!' }, {
      article_id: 2, title: 'A'
    }];
    const output = { 'Student SUES Mitch!': 1, 'A': 2 };
    expect(makeRefObj(input)).to.eql(output);
  });
});

describe('formatComments', () => {
  it('returns an empty array when passed an empty array', () => {
    expect(formatComments([])).to.eql([]);
  });
});
