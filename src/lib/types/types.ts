type Task = {
    Candidates: number;
    Company_id: number;
    Company_name: string;
    Date: string;
    Emails: [string, boolean | 'fail'][];
    Eval_steps: string | null;
    Logo: string | null | undefined;
    Manager_id: string;
    Manager: string;
    Onboarding: boolean;
    Order_id: string;
    Role: string;
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"
    Type: "onboarding" | "completed" | "create_takehome" | "tech_interview" | "update";
}

interface Eval_Step {
    step: string;
    description: string;
    order: number;
}

interface Evaluation {
    email: string;
    result: string;
    note: string | null | undefined;
}