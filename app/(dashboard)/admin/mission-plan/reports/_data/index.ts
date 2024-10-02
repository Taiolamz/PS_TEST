export const SPECIFIED_TASK_CHART_LABELS = [
    {title: "Completed", value: 20, color: 'green'},
    {title: "In Progress", value: 35, color: 'yellow'},
    {title: "Overdue", value: 40, color: 'red'},
    {title: "Not Started", value: 5, color: 'brown'},
]

export const MOS_LABEL_TYPES = [
    {title: "0% - 35%", color: 'red'},
    {title: "40% - 65%", color: 'yellow'},
    {title: "70% - 100%", color: 'green'},
]

export const PAGE_LEGEND = [
    {title: "Target", color: 'purple'},
    {title: "<50% Progress", color: 'red'},
    {title: "50%-69% Progress", color: 'yellow'},
    {title: "70%-100% Progress", color: 'green'},
]


export const ACHIEVEMENT_PROGRESS_DATA = [
    {
        title: "Revenue",
        progress: 65,
        color: 'yellow',
        target: "1,000,000,000,000 $",
        targetColor: "#6B51DF"
    },
    {
        title: "Platinum Customer Application",
        progress: 40,
        color: 'yellow',
        target: "15",
        targetColor: "#6B51DF"
    },
    {
        title: "Completed Projects",
        progress: 80,
        color: 'yellow',
        target: "500",
        targetColor: "#6B51DF"
    },
    {
        title: "Products Lunch",
        progress: 75,
        color: 'yellow',
        target: "3",
        targetColor: "#6B51DF"
    },
]

export const REVIEW_PERIOD_OPTIONS = [
    {
        label: "First Week",
        value: "first_week",
    },
    {
        label: "Second Week",
        value: "second_week",
    },
    {
        label: "Third Week",
        value: "third_week",
    },
    {
        label: "Last Week",
        value: "last_week",
    },
    {
        label: "First And Second Week",
        value: "first_and_second_week",
    },
    {
        label: "Third And Last Week",
        value: "third_and_last_week",
    },
    {
        label: "All Through The Month",
        value: "all_through",
    },
]

export const EXTEND_PERIOD_OPTIONS = [
  {
      label: "One More Work Day",
      value: "one_more_day",
  },
  {
      label: "Two More Work Days",
      value: "two_more_days",
  },
  {
      label: "Three More Work Days",
      value: "three_more_days",
  },
  {
      label: "One More Week",
      value: "one_more_week",
  },
]

export const CHALLENGES_DATA = [
    {
      id: 1,
      title: "Incomplete Implied Tasks for Q1",
      priority: "High",
      priorityColor: "red", // Can be used to set the background of the status label
      description:
        "Please look through your implied tasks, not complete. I have informed OED to decline it",
      recommendation: "remove user from the team",
    },
    {
      id: 2,
      title: "Incomplete Implied Tasks for Q2",
      priority: "Mid",
      priorityColor: "yellow",
      description: "Please look through your implied tasks, not complete",
      recommendation: "remove user from the team",
    },
    {
      id: 3,
      title: "Incomplete Implied Tasks for Q3",
      priority: "Low",
      priorityColor: "green",
      description: "Please look through your implied tasks, not complete",
      recommendation: "remove user from the team",
    },
    {
      id: 4,
      title: "Incomplete Implied Tasks for Q4",
      priority: "High",
      priorityColor: "red",
      description: "Please look through your implied tasks, not complete",
      recommendation: "remove user from the team",
    },
  ];

  export  const MOS_DATA = [
    {
      title: "Revenue",
      fy_target: "150,0000",
      unit: "$",
      weight: "20",
      fy_achieved: "67",
      amount: "100,234,000",
      id: 1,
      percentage: 67,
      table_details: [
        {
          review_period: "Q1",
          target: "75,000,000",
          achieved_target: "58,000,000",
          percentage: 30,
        },
        {
          review_period: "Q2",
          target: "50,000,000",
          achieved_target: "45,000,000",
          percentage: 40,
        },
        {
          review_period: "Q3",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 60,
        },
        {
          review_period: "Q4",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 95,
        },
      ],
    },
    {
      title: "Revenue",
      fy_target: "150,0000",
      unit: "$",
      weight: "20",
      fy_achieved: "67",
      amount: "100,234,000",
      id: 2,
      percentage: 67,
      table_details: [
        {
          review_period: "Q1",
          target: "75,000,000",
          achieved_target: "58,000,000",
          percentage: 30,
        },
        {
          review_period: "Q2",
          target: "50,000,000",
          achieved_target: "45,000,000",
          percentage: 40,
        },
        {
          review_period: "Q3",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 60,
        },
        {
          review_period: "Q4",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 95,
        },
      ],
    },
    {
      title: "Revenue",
      fy_target: "150,0000",
      unit: "$",
      weight: "20",
      fy_achieved: "67",
      amount: "100,234,000",
      id: 3,
      percentage: 67,
      table_details: [
        {
          review_period: "Q1",
          target: "75,000,000",
          achieved_target: "58,000,000",
          percentage: 30,
        },
        {
          review_period: "Q2",
          target: "50,000,000",
          achieved_target: "45,000,000",
          percentage: 40,
        },
        {
          review_period: "Q3",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 60,
        },
        {
          review_period: "Q4",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 95,
        },
      ],
    },
  ];
  