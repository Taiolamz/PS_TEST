import avatar from "@/public/svgs/avatar.svg";

export const data = [
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
        approvalStatus: "Not Approved",
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
        approvalStatus: "Not Approved",

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
        approvalStatus: "Not Approved",

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
        approvalStatus: "Not Approved",

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
    approvalStatus: "Not Approved",

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

export const historyData = [
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

export const commentData = [
  {
    id: 1,
    name: "Seyi Ajayi",
    date: "06-06-2022,  2mins",
    comment: "Please look through your implied tasks, not complete",
    img: avatar,
  },
  {
    id: 2,
    name: "Seyi Ajayi",
    date: "06-06-2022,  2mins",
    comment: "Please look through your implied tasks, not complete",
    img: avatar,
  },
  {
    id: 3,
    name: "Seyi Ajayi",
    date: "06-06-2022,  2mins",
    comment: "Please look through your implied tasks, not complete",
    img: avatar,
  },
  {
    id: 4,
    name: "Seyi Ajayi",
    date: "06-06-2022,  2mins",
    comment: "Please look through your implied tasks, not complete",
    img: avatar,
  },
];
