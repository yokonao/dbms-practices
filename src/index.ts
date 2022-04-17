import { execute, measureJoinPerformance } from './join';
import { BTree } from './btree';

const [, , firstArg, secondArg, thirdArg, forthArg] = process.argv;

if (!firstArg) {
  console.error('Please pass one argument!!');
  process.exit(1);
}

if (firstArg === 'btree') {
  const tree = new BTree(Number.MAX_VALUE);
  tree.insert(10);
  console.log(tree.locate(10));
  tree.insert(8);
  console.log(tree.locate(10));
  console.log(tree.locate(8));
} else if (firstArg === 'join') {
  execute();
} else if (firstArg === 'measure') {
  if (secondArg === 'join') {
    if (forthArg === 'NL' || forthArg === 'H') {
      measureJoinPerformance(Number(thirdArg), forthArg);
    }
  }
}
