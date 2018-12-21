export type MaybeArray<T> = T | T[]

export interface Converter {
  id: string
  supports (key: string): boolean
  convert (key: string, data: string): MaybeArray<{ key: string, data: string }>
}
