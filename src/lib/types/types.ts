type Task = {
    Company_id: number;
    Company_name: string;
    Date: string;
    Manager_id: string;
    Manager: string;
    Order_id: string;
    Role: string;
    Candidates: number;
    Onboarding: boolean;
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"
    Type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
} //     Logo: string;

type Client_order = {
    Created_by: string;
    Role: string;
    Candidates: number;
    Skills: string[];
    Onboarding: boolean;
    Status: "In-Progress" | "Pending" | "Completed"
    Type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
}