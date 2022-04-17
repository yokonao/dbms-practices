import { BTree } from 'btree';

const [, , firstArg] = process.argv;

if (!firstArg) {
  console.error('Please pass one argument!!');
  process.exit(1);
}

console.log(firstArg);

if (firstArg === 'btree') {
  const tree = new BTree(Number.MAX_VALUE);
  tree.insert(10);
  console.log(tree.locate(10));
  tree.insert(8);
  console.log(tree.locate(10));
  console.log(tree.locate(8));
}
