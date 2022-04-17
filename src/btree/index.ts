class BTreeNode {
  private degree: number;
  private keys: number[];
  private isLeaf: boolean;
  private children: BTreeNode[];

  constructor(degree: number, isLeaf: boolean) {
    this.degree = degree;
    this.keys = [];
    this.isLeaf = isLeaf;
    this.children = [];
  }

  private calcInsertedIndex(key: number) {
    for (let i = 0; i < this.keys.length; i++) {
      if (key < this.keys[i]) {
        return i;
      }
    }
    return this.keys.length - 1;
  }

  public appendKey(key: number) {
    const insertedIndex = this.calcInsertedIndex(key);
    this.keys.splice(insertedIndex, 0, key);
  }

  public locate(key: number) {
    if (this.isLeaf) {
      return this.keys.findIndex((k) => k === key);
    }

    throw new Error('Not Implemented');
  }
}

export class BTree {
  private degree: number;
  private root: BTreeNode;

  constructor(degree: number) {
    this.degree = degree;
    this.root = new BTreeNode(degree, true);
  }

  public insert(key: number) {
    this.root.appendKey(key);
  }

  public locate(key: number) {
    return this.root.locate(key);
  }
}


