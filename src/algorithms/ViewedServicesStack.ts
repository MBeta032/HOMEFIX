export class ViewedServicesStack {
  private items: string[];

  constructor() {
    this.items = [];
  }

  push(serviceId: string): void {
    this.items.push(serviceId);
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

  print(): string[] {
    return [...this.items].reverse();
  }
}

export const viewedServicesStack = new ViewedServicesStack();
