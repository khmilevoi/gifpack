import { IRepository, IRepositoryFactory } from "layers/repository.interface";
import { MemoryRepository } from "./memory.repository";
import fs from "fs";
import * as path from "path";

export class FsRepositoryFactory implements IRepositoryFactory {
  constructor(private readonly dir: string) {}

  create<Entity>(storageId: string): IRepository<Entity> {
    return new FsRepository<Entity>(storageId, this.dir);
  }
}

class FsRepository<Entity> extends MemoryRepository<Entity> {
  constructor(
    private readonly storageId: string,
    private readonly dir: string,
  ) {
    super();
    this.load();
  }

  private createPath() {
    return path.resolve(this.dir, `${this.storageId}.json`);
  }

  private load() {
    if (!fs.existsSync(this.createPath())) {
      fs.writeFileSync(
        this.createPath(),
        JSON.stringify({ ids: [], items: [] }),
      );
    }

    const data = fs.readFileSync(this.createPath(), "utf-8");
    const parsedData = JSON.parse(data);
    this.ids = new Set(parsedData.ids);
    this.items = new Map(parsedData.items);
  }

  private async save() {
    const data = JSON.stringify({
      ids: Array.from(this.ids),
      items: Array.from(this.items.entries()),
    });

    await fs.promises.writeFile(this.createPath(), data);
  }

  async add(id: string, item: Entity) {
    const result = await super.add(id, item);
    await this.save();

    return result;
  }

  async addMany(items: Entity[], idField: keyof Entity): Promise<Entity[]> {
    const result = await super.addMany(items, idField);
    await this.save();

    return result;
  }

  async addOrUpdate(id: string, item: Entity): Promise<Entity> {
    const result = await super.addOrUpdate(id, item);
    await this.save();

    return result;
  }

  async addOrUpdateMany(
    items: Entity[],
    idField: keyof Entity,
  ): Promise<Entity[]> {
    const result = await super.addOrUpdateMany(items, idField);
    await this.save();

    return result;
  }

  async remove(id: string) {
    await super.remove(id);
    await this.save();
  }

  async update(id: string, item: Entity) {
    const result = await super.update(id, item);
    await this.save();

    return result;
  }

  async patch(id: string, item: Partial<Entity>) {
    const result = await super.patch(id, item);
    await this.save();

    return result;
  }

  async get(id: string) {
    return super.get(id);
  }

  async getAll() {
    return super.getAll();
  }

  async find(search: Partial<Entity>): Promise<Entity[]> {
    return super.find(search);
  }

  async findOne(search: Partial<Entity>): Promise<Entity | null> {
    return super.findOne(search);
  }

  async has(id: string): Promise<boolean> {
    return super.has(id);
  }
}
