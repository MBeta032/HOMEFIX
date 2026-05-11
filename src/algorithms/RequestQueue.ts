import type { IRequest } from "../interfaces/Requests/request.interface";

export default class RequestQueue {
  private items: IRequest[];

  constructor(initialItems: IRequest[] = []) {
    this.items = [...initialItems];
  }

  enqueue(request: IRequest): void {
    this.items.push(request);
  }

  dequeue(): IRequest | undefined {
    return this.items.shift();
  }

  peek(): IRequest | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  print(): IRequest[] {
    return [...this.items];
  }

  getItems(): IRequest[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }
}