function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Row = {
  [column: string]: number;
};

const createTestDataA = (n: number) => {
  const rows = [...Array(n)].map((_, i) => ({
    a_id: i + 1,
    column_a: getRandomInt(Number.MAX_VALUE),
    b_id: getRandomInt(n) + 1,
  }));
  return rows;
};

const createTestDataB = (n: number) => {
  const rows = [...Array(n)].map((_, i) => ({
    b_id: i + 1,
    column_b: getRandomInt(Number.MAX_VALUE),
  }));
  return rows;
};

type JoinFunction = (
  left: Row[],
  right: Row[],
  leftColumnName: string,
  rightColumnName: string
) => Row[];

const innerJoinSimple: JoinFunction = (
  left,
  right,
  leftColumnName,
  rightColumnName
) => {
  const res: Row[] = [];
  left.forEach((r1) => {
    right.forEach((r2) => {
      if (r1[leftColumnName] === r2[rightColumnName]) {
        res.push({
          ...r1,
          ...r2,
        });
      }
    });
  });

  return res;
};

const innerJoinHash: JoinFunction = (
  left,
  right,
  leftColumnName,
  rightColumnName
) => {
  const res: Row[] = [];
  const hashTable: { [hashedValue: number]: Row[] } = {};
  left.forEach((r1) => {
    const hashedValue = r1[leftColumnName];
    if (hashTable[hashedValue]) {
      hashTable[hashedValue].push(r1);
    } else {
      hashTable[hashedValue] = [r1];
    }
  });

  right.forEach((r2) => {
    const hashedValue = r2[rightColumnName];
    if (hashTable[hashedValue]) {
      hashTable[hashedValue].forEach((r1) => {
        if (r1[leftColumnName] === r2[rightColumnName]) {
          res.push({
            ...r1,
            ...r2,
          });
        }
      });
    }
  });

  return res;
};

export const execute = () => {
  const n = 1000;
  const dataA = createTestDataA(n);
  const dataB = createTestDataB(n);
  const simpleJoined = innerJoinSimple(dataA, dataB, 'b_id', 'b_id');
  const hashJoined = innerJoinHash(dataA, dataB, 'b_id', 'b_id');

  console.log('===TABLE A===');
  console.log(dataA);
  console.log('\n\n');
  console.log('===TABLE B===');
  console.log(dataB);
  console.log('\n\n');
  console.log('===SIMPLE JOINED TABLE===');
  console.log(simpleJoined);
  console.log('\n\n');
  console.log('===HASH JOINED TABLE===');
  console.log(hashJoined);
};
