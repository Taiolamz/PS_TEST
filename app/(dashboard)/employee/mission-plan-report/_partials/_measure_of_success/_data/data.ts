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
    status: "",
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
    status: "approved",
    user: {
      id: "01j82sp42s5yjj6f8vaxqdr2wj",
      name: "Isaac Ubani",
      email: "iubani@mailinator.com",
      role: "staff",
    },
  },
];

export const targetdata = [
  {
    id: 1,
    title: "Achieve 1billion in revenue from all company products",
    weight: 50,
    status: "pending",
    startDate: "2024-09-10",
    endDate: "2024-10-10",
    impliedTasks: [
      {
        id: 1,
        title: "implied task one",
        percent: 40,
        expectedOutcome: "To achieve 80 percent",
        task: [
          {
            name: "Achieve New user onboarding for over 50 new customers",
            weight: 80,
            resources: ["Adamu Bryan", "Damilare Adebowale"],
          },
        ],
        downlineExpectations: [
          {
            id: 1,
            name: "Adamu Bryan",
            value: 50,
          },
          {
            id: 2,
            name: "Damilare Adebowale",
            value: 50,
          },
        ],
      },
      {
        id: 2,
        title: "implied task two",
        percent: 78,
        expectedOutcome: "To achieve 100 percent",
        task: [
          {
            name: "Achieve New user onboarding for over 50 new customers",
            weight: 80,
            resources: ["Adamu Bryan", "Damilare Adebowale"],
          },
        ],
        downlineExpectations: [
          {
            id: 1,
            name: "Adamu Bryan",
            value: 50,
          },
          {
            id: 2,
            name: "Damilare Adebowale",
            value: 50,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Achieve 1billion in revenue from all company products",
    weight: 85,
    status: "pending",
    startDate: "2024-09-10",
    endDate: "2024-10-10",
    impliedTasks: [
      {
        id: 1,
        title: "implied task one",
        percent: 48,
        expectedOutcome: "To achieve 70 percent",
        task: [
          {
            name: "Achieve New user onboarding for over 50 new customers",
            weight: 80,
            resources: ["Adamu Bryan", "Damilare Adebowale"],
          },
        ],
        downlineExpectations: [
          {
            id: 1,
            name: "Adamu Bryan",
            value: 50,
          },
          {
            id: 2,
            name: "Damilare Adebowale",
            value: 50,
          },
        ],
      },
      {
        id: 2,
        title: "implied task two",
        percent: 48,
        expectedOutcome: "To achieve 80 percent",
        task: [
          {
            name: "Achieve New user onboarding for over 50 new customers",
            weight: 80,
            resources: ["Adamu Bryan"],
          },
        ],
        downlineExpectations: [
          {
            id: 1,
            name: "Adamu Bryan",
            value: 50,
          },
          {
            id: 2,
            name: "Damilare Adebowale",
            value: 50,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Achieve 1billion in revenue from all company products",
    weight: 69,
    status: "pending",
    startDate: "2024-09-10",
    endDate: "2024-10-10",
    impliedTasks: [
      {
        id: 1,
        title: "implied task one",
        percent: 48,
        expectedOutcome: "To achieve 80 percent",
        task: [
          {
            name: "Achieve New user onboarding for over 50 new customers",
            weight: 80,
            resources: ["Damilare Adebowale"],
          },
        ],
        downlineExpectations: [
          {
            id: 1,
            name: "Adamu Bryan",
            value: 50,
          },
          {
            id: 2,
            name: "Damilare Adebowale",
            value: 50,
          },
        ],
      },
    ],
  },
];

export const fakehistoryData = [
  {
    id: 1,
    month: "January",
    status: "approved",
    title: "Measure of Success Title",
    percentage: "48%",
    target: "1,000,000,000 $",
    achievement: "500,000,000 $",
  },
  {
    id: 2,
    month: "February",
    status: "approved",
    title: "Revenue",
    percentage: "48%",
    target: "1,000,000,000 $",
    achievement: "500,000,000 $",
  },
  {
    id: 3,
    month: "March",
    status: "approved",
    title: "Revenue",
    percentage: "48%",
    target: "1,000,000,000 $",
    achievement: "500,000,000 $",
  },
  {
    id: 4,
    month: "April",
    status: "approved",
    title: "Revenue",
    percentage: "48%",
    target: "1,000,000,000 $",
    achievement: "500,000,000 $",
  },
];
