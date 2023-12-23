export class Injector {
  private readonly dependencies: Map<symbol, unknown> = new Map();

  register<T>(injectable: IInjectable<T>, dependency: T) {
    this.dependencies.set(injectable.id, dependency);
  }

  resolve<T>(injectable: IInjectable<T>): T {
    const dependency = this.dependencies.get(injectable.id);

    if (dependency) {
      return dependency as T;
    }

    throw new Error(`Dependency ${injectable.id.toString()} not found.`);
  }

  static create<T>(): IInjectable<T> {
    const id = Symbol();

    return {
      id,
      __type__: id as unknown as T,
    };
  }
}

export interface IInjectable<T> {
  id: symbol;
  __type__: T;
}
