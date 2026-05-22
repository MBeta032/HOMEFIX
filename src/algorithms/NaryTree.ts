export interface TreeMenuNode<T> {
  value: T;
  children: TreeMenuNode<T>[];
}

export class NaryTreeNode<T> {
  value: T;
  children: NaryTreeNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }

  addChild(value: T): NaryTreeNode<T> {
    const newNode = new NaryTreeNode(value);
    this.children.push(newNode);
    return newNode;
  }
}

export class NaryTree<T extends { id: string; name: string }> {
  root: NaryTreeNode<T>;

  constructor(rootValue: T) {
    this.root = new NaryTreeNode(rootValue);
  }

  addChild(parentId: string, childValue: T): boolean {
    const parentNode = this.findNode(parentId);

    if (!parentNode) {
      return false;
    }

    parentNode.addChild(childValue);
    return true;
  }

  findNode(
    id: string,
    currentNode: NaryTreeNode<T> = this.root
  ): NaryTreeNode<T> | null {
    if (currentNode.value.id === id) {
      return currentNode;
    }

    for (const child of currentNode.children) {
      const foundNode = this.findNode(id, child);

      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }

  getChildren(id: string): T[] {
    const node = this.findNode(id);

    if (!node) {
      return [];
    }

    return node.children.map((child) => child.value);
  }

  traverse(currentNode: NaryTreeNode<T> = this.root, result: T[] = []): T[] {
    result.push(currentNode.value);

    currentNode.children.forEach((child) => {
      this.traverse(child, result);
    });

    return result;
  }

  print(currentNode: NaryTreeNode<T> = this.root, level: number = 0): string {
    let text = `${" ".repeat(level * 2)}- ${currentNode.value.name}\n`;

    currentNode.children.forEach((child) => {
      text += this.print(child, level + 1);
    });

    return text;
  }

  toMenuData(currentNode: NaryTreeNode<T> = this.root): TreeMenuNode<T> {
    return {
      value: currentNode.value,
      children: currentNode.children.map((child) => this.toMenuData(child)),
    };
  }
}