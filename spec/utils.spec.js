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
  it('returns an empty object when passed an empty array', () => {
    expect(makeRefObj([])).to.eql({});
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
  it('takes an array of comment objects and a reference object, and returns a new array of formatted comments.', () => {
    const input = [{
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      created_at: 1511354163389
    }]
    const articleRef = { "They're not exactly dogs, are they?": 1 };
    const output = [{
      article_id: 1,
      author: 'butter_bridge',
      created_at: new Date(1511354163389)
    }]
    expect(formatComments(input, articleRef)).to.eql(output)
  });
  it('takes an array of different comment objects and a reference object, and returns a new array of formatted comments.', () => {
    const input = [{
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      created_at: 1511354163389
    }, {
      belongs_to: "Living in the shadow of a great man",
      created_by: 'butter_bridge',
      created_at: 1479818163389
    }
    ]
    const articleRef = { "They're not exactly dogs, are they?": 1, 'Living in the shadow of a great man': 2 };
    const output = [{
      article_id: 1,
      author: 'butter_bridge',
      created_at: new Date(1511354163389)
    },
    {
      article_id: 2,
      author: 'butter_bridge',
      created_at: new Date(1479818163389)
    }
    ]
    expect(formatComments(input, articleRef)).to.eql(output)
  });
  it('takes an array of different comment objects and a reference object, and returns a new array of formatted comments-- for full comment keys', () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    }]
    const articleRef = { "They're not exactly dogs, are they?": 1, 'Living in the shadow of a great man': 2 };
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(1511354163389),
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      article_id: 2,
      author: 'butter_bridge',
      votes: 14,
      created_at: new Date(1479818163389),
    }]
    expect(formatComments(input, articleRef)).to.eql(expected);
  });
});
