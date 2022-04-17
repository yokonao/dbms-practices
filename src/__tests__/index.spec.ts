import { BTree } from '../index';

describe('insert', () => {
  const tree = new BTree(Number.MAX_VALUE);
  it('insert to root node', () => {
    const fixtures = [
      { key: 10, expected: 7 },
      { key: 5, expected: 4 },
      { key: 3, expected: 2 },
      { key: 2, expected: 1 },
      { key: 8, expected: 6 },
      { key: 4, expected: 3 },
      { key: 1, expected: 0 },
      { key: 6, expected: 5 },
    ];
    fixtures.forEach((f) => {
      tree.insert(f.key);
    });
    fixtures.forEach((f) => {
      expect(tree.locate(f.key)).toEqual(f.expected);
    });
  });
});
