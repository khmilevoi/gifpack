import {
  IRepository,
  IRepositoryFactory,
} from "layers/repository.interface";

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
}
