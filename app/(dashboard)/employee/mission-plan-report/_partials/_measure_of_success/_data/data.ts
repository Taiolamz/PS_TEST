export const fakeTableData = [
  {
    id: "01j82vwk2pj57pqv3b8rdt8zag",
    fyName: "FY 2024",
    status: "Ongoing",
    approvalProgress: 1,
    taskCompletionPercentage: 60,
  },
  {
    id: "euf45cy7466",
    fyName: "Financial Year 2023",
    status: "Closed",
    approvalProgress: 4,
    taskCompletionPercentage: 100,
  },
  {
    id: "12cjif0",
    fyName: "FY 2022",
    status: "Closed",
    approvalProgress: 2,
    taskCompletionPercentage: 70,
  },
  {
    id: "01j83p1hcbtfp0zwedbsq3w0y1",
    fyName: "FY 2021",
    status: "Ongoing",
    approvalProgress: 3,
    taskCompletionPercentage: 39,
  },
];

export const fakeApprovalStep = [
  {
    id: "01j84gm7211j55a3z744nz9ktx",
    step: 1,
    status: "pending",
    user: {
      id: "01j82rgdtxghzpy8gy0jpa4cxz",
      name: "Adeyinka Oyekola",
      email: "organizationhead@mailinator.com",
      role: "ceo",
    },
  },
  {
    id: "01j84gmdpr8h8z5efjrip0v22",
    step: 2,
    status: "pending",
    user: {
      id: "01j82sp42s5yjj6f8vaxqdr2wj",
      name: "Talitu Kadiri",
      email: "talitu@mailinator.com",
      role: "strategy-admin",
    },
  },
  {
    id: "01j842iffr8h8z5e2ef3kp0v22",
    step: 3,
    status: "approved",
    user: {
      id: "01j82sp42s5yjj6f8vaxqdr2wj",
      name: "Tolu Gaji",
      email: "tgaji@mailinator.com",
      role: "staff",
    },
  },
  {
    id: "01j84gmdlfdf5e2ef3kp0v22",
    step: 4,
    status: "rejected",
    user: {
      id: "01j82sp42s5yjj6f8vaxqdr2wj",
      name: "Isaac Ubani",
      email: "iubani@mailinator.com",
      role: "staff",
    },
  },
];
