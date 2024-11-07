import { writable } from 'svelte/store';

type EmailStatus = boolean | 'fail';
type EmailEntry = [string, EmailStatus];

interface EmailStore {
    emails: EmailEntry[];
    loading: boolean;
    error?: string;
}

export const emailStore = writable<EmailStore>({
    emails: [],
    loading: false
});

export interface SendEmailsActionResult {
    success: boolean;
    error?: string;
    updatedData?: {
        status: string;
        checkpoint: string;
        emails: [string, boolean | 'fail'][];
    }[];
}