export interface IRepositoryFactory {
  create<Entity>(storageId: string): IRepository<Entity>;
}

export interface IRepository<Entity> {
  add(id: string, item: Entity): Promise<Entity>;

  addMany(items: Entity[], idField: keyof Entity): Promise<Entity[]>;

  addOrUpdate(id: string, item: Entity): Promise<Entity>;

  addOrUpdateMany(items: Entity[], idField: keyof Entity): Promise<Entity[]>;

  remove(id: string): Promise<void>;

  get(id: string): Promise<Entity | null>;

  getAll(): Promise<Entity[]>;

  find(search: Partial<Entity>): Promise<Entity[]>;

  findOne(search: Partial<Entity>): Promise<Entity | null>;

  update(id: string, item: Entity): Promise<Entity>;

  patch(id: string, item: Partial<Entity>): Promise<Entity>;

  has(id: string): Promise<boolean>;
}
