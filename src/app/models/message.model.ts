export class Message {
    type: string;
    content: string;
    timestamp: string;
    messageId?: number;
    own: boolean;
    fileName?: string
}