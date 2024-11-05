type Email_Recipient = {
    name: string;
    email: string;
}

type Task = {
    Candidates: number;
    Company_id: number;
    Company_name: string;
    Date: string;
    Emails: string[];
    Logo: string | null | undefined;
    Manager_id: string;
    Manager: string;
    Onboarding: boolean;
    Order_id: string;
    Role: string;
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"
    Type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
}
