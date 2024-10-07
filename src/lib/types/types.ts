function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

type Task = {
    Company_id: number;
    Company_name: string;
    Date: string;
    Logo: string;
    Manager_id: string;
    Manager: string;
    Order_id: string;
    Role: string;
    Candidates: number;
    Onboarding: boolean;
    Skills: string[];
    Status: "In-Progress" | "Pending" | "Completed"
    Type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
}

type Client_order = {
    Created_by: string;
    Role: string;
    Candidates: number;
    Skills: string[];
    Onboarding: boolean;
    Status: "In-Progress" | "Pending" | "Completed"
    Type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
}