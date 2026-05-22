export class Stack<T> {
  private items: T[]

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems]
  }

  push(element: T): void {
    this.items.push(element)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  toArray(): T[] {
    return [...this.items]
  }

  print(): T[] {
    return this.toArray()
  }
}