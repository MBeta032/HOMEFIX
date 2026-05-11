export class Stack {
  private items: string[];

  constructor() {
    this.items = [];
  }

  push(element: string): void {
    this.items.push(element);
  }

  pop(): string | undefined {
    return this.items.pop();
  }

  peek(): string | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  print(): string[] {
    return [...this.items];
  }
}