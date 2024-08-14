export interface ApprovalSteps {
    id: string;
    status: string;
    step: number;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}