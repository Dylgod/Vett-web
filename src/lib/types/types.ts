type Task = {
    Company: string;
    Date: string;
    Logo: string;
    Manager: string | null;
    Order_id: string;
    Role: string;
    Type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"
}

type Client_order = {
    Created_at: number;
    Created_by: string;
    Created_for: number | undefined;
    Role: string;
    Candidates: number;
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"
}

type Supabase_returned_order_row = {
    id: number;
    Created_at: number;
    Created_by: string;
    Created_for: string;
    Role: string;
    Candidates: number;
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"  
}

// id, date, description = text-gray-300
// theme = gruvboxDark
// colors = aqua, purple, yellow, blue, red

// onboarding = aqua
// create_takehome = purple
// tech_interview = yellow
// update & review = blue