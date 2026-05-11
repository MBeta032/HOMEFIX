import type { IService } from "../interfaces/ServiceDetail/service.interface";

export default class CartQueue {
  private items: IService[];

  constructor(initialItems: IService[] = []) {
    this.items = [...initialItems];
  }

  enqueue(service: IService): void {
    this.items.push(service);
  }

  dequeue(): IService | undefined {
    return this.items.shift();
  }

  peek(): IService | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  contains(id: string): boolean {
    return this.items.some((service: IService) => service.id === id);
  }

  removeById(id: string): void {
    this.items = this.items.filter((service: IService) => service.id !== id);
  }

  clear(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce(
      (total: number, service: IService) => total + service.price,
      0
    );
  }

  getItems(): IService[] {
    return [...this.items];
  }
}