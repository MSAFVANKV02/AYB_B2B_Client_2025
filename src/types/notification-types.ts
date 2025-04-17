export interface INotification {
    _id: string
    type: string
    title: string
    message: string
    isRead: boolean
    users: string[]
    dbModel: string
    relatedOrder: any
    createdAt: string
    updatedAt: string
    __v: number
  }
  