import { IRepository, IRepositoryFactory } from "layers/repository.interface";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  create<Entity>(): IRepository<Entity> {
    return new MemoryRepository<Entity>();
  }
}

export class MemoryRepository<Entity> implements IRepository<Entity> {
  protected ids = new Set<string>();
  protected items = new Map<string, Entity>();

  async add(id: string, item: Entity) {
    this.ids.add(id);
    this.items.set(id, item);

    return item;
  }

  addMany(items: Entity[], idField: keyof Entity): Promise<Entity[]> {
    return Promise.all(items.map((item) => this.add(`${item[idField]}`, item)));
  }

  async addOrUpdate(id: string, item: Entity): Promise<Entity> {
    if (this.ids.has(id)) {
      return this.update(id, item);
    } else {
      return this.add(id, item);
    }
  }

  async addOrUpdateMany(
    items: Entity[],
    idField: keyof Entity,
  ): Promise<Entity[]> {
    return Promise.all(
      items.map((item) => this.addOrUpdate(`${item[idField]}`, item)),
    );
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
    if (!this.ids.has(id)) {
      throw new Error(`Item with id ${id} not found`);
    }

    this.items.set(id, item);

    return item;
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
    const items = await this.find(search);

    return items[0] ?? null;
  }

  async patch(id: string, item: Partial<Entity>): Promise<Entity> {
    const currentItem = this.items.get(id);

    if (currentItem === undefined) {
      throw new Error(`Item with id ${id} not found`);
    }

    const newItem: Entity = {
      ...currentItem,
      ...item,
    };

    this.items.set(id, newItem);

    return newItem;
  }

  async has(id: string): Promise<boolean> {
    return this.ids.has(id);
  }
}
