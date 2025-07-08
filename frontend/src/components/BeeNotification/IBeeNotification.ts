import { ReactElement } from "react";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface IBeeNotification{
    type: NotificationType;
    title: string;
    message: string;
    content?: ReactElement;
}