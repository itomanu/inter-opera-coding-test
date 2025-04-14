export enum DealStatus {
  ClosedWon = "Closed Won",
  ClosedLost = "Closed Lost",
  InProgress = "In Progress",
}

export interface Deal {
  client: string
  value: number
  status: DealStatus
}

export interface Client {
  name: string
  industry: string
  contact: string
}

export interface SalesRep {
  id: number
  name: string
  role: string
  region: string
  skills: string[]
  deals: Deal[]
  clients: Client[]
}
