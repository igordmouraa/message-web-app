export interface Chat {
    id: string
    participants: string[]
    lastMessage: string
    timestamp: Date
    unreadCount: number
}

export interface User {
    uid: string
    email: string
    displayName: string
    photoURL: string
    contacts: string[]
}

export interface Message {
    id: string
    text: string
    sender: string
    timestamp: Date
    status?: 'sent' | 'delivered' | 'read'
}
