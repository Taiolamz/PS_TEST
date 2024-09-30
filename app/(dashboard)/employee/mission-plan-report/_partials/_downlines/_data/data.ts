export const Taskdata = [
  {
    id: "45gt5jr676w4tgrs",
    title: "Achieve 1billion in revenue from all company products",
    weight: 50,
    status: "pending",
    startDate: "2024/09/10",
    endDate: "2024/10/10",
    impliedTasks: [
      {
        id: "545r45rg",
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
            id: "45gt5jr676w4tgrs",
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
            id: "45gt5jr676w4tgrs",
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
    startDate: "2024/09/10",
    endDate: "2024/10/10",
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
];
