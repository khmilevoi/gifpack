import { IRepository, IRepositoryFactory } from "layers/repository.interface";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  create<Entity>() {
    return new MemoryRepository<Entity>();
  }
}

class MemoryRepository<Entity> implements IRepository<Entity> {
  private ids = new Set<string>();
  private items = new Map<string, Entity>();

  async add(id: string, item: Entity) {
    this.ids.add(id);
    this.items.set(id, item);

    return item;
  }

  async remove(id: string) {
    this.ids.delete(id);
    this.items.delete(id);
  }

  async get(id: string) {
    return this.items.get(id) ?? null;
  }

  async getAll() {
    return Array.from(this.items.values());
  }

  async update(id: string, item: Entity) {
    this.items.set(id, item);
  }

  async find(search: Partial<Entity>): Promise<Entity[]> {
    const items = Array.from(this.items.values());

    return items.filter((item) => {
      for (const key in search) {
        if (item[key] !== search[key]) {
          return false;
        }
      }

      return true;
    });
  }

  async findOne(search: Partial<Entity>): Promise<Entity | null> {
    const items = this.find(search);

    return items[0] ?? null;
  }
}
