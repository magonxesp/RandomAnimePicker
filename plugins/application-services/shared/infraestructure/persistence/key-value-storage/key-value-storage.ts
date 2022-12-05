export interface KeyValueStorage {
    get<T>(key: string): Promise<T|null>
    set<T>(key: string, value: T): Promise<void>
    remove(key: string): Promise<void>
}
