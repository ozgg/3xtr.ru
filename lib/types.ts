export type CorpusType = {
  id: number
  userId?: number
  createdAt: string
  updatedAt: string
  name: string,
  personal: boolean,
  shared: boolean
}

export type RequestEntityParams = {
  id: string
}
