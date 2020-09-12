export class Message {
    type: string;
    is_display: boolean;
    sender_name?: string;
    sender_id?:any;
    content: string;
    timestamp: string;
    messageId?: number;
    own: boolean;
    fileName?: string;
    color: string;
}