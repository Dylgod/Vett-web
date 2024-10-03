type Task = {
    company: string;
    date: string;
    logo: string;
    manager: string | null;
    order_id: string;
    role: string;
    type: "onboarding" | "review" | "create_takehome" | "tech_interview" | "update";
    skills: string[];
    status: "in_progress" | "pending" | "completed"
}

// type Order = {}

// id, date, description = text-gray-300
// theme = gruvboxDark
// colors = aqua, purple, yellow, blue, red

// onboarding = aqua
// create_takehome = purple
// tech_interview = yellow
// update & review = blue