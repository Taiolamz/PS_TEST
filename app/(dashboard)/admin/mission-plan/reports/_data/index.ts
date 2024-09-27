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
  