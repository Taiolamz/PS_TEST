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

// const resdata = {
//   status: "success",
//   data: {
//     tasks: [
//       {
//         id: "01j96s794bf95b5efk2xg9rq4r",
//         task: "complete automation tests on zojapay",
//         success_measures: [
//           {
//             id: "01j96qxnhg5z6a3qeexjykmtty",
//             measure: "completion of tsts",
//           },
//         ],
//         strategic_pillars: [
//           {
//             id: "01j91e1c7erknnazswqms99c8w",
//             title: "Productivity",
//           },
//           {
//             id: "01j91e1ce2e5p1vqcph6j0ktb4",
//             title: "Innovation",
//           },
//           {
//             id: "01j91e1cmmb7brkkpf0kv8n14v",
//             title: "Integrity",
//           },
//           {
//             id: "01j91e1cv7v370m1gvn90p0xae",
//             title: "Resilience",
//           },
//         ],
//         start_date: "2024-10-02",
//         end_date: "2025-03-20",
//         is_main_effort: 0,
//         line_manager_implied_task: {
//           id: "01j91nggxq3zwg624a0tk6yy8s",
//           task: "AUTOMATE ZOJAPAY WEB",
//         },
//         implied_tasks: [
//           {
//             id: "01j96tk7t98mghaxfq28adqaw2",
//             resources: [
//               {
//                 staff_member_id: "01j96td0v6wzca54c19wyahm7b",
//                 name: "hope wellis",
//                 percentage: "100.00",
//               },
//             ],
//             task: "run the automation every morning",
//             weight: "100",
//             percentage: null,
//             start_date: "2024-11-29",
//             end_date: "2025-06-11",
//             status: "pending",
//             task_outcome: [
//               {
//                 id: "01j9p0q374fnx1fd7m43fd4y01",
//                 fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//                 mission_plan_id: "01j96qpszq2vnztwkz6vma1rqh",
//                 expected_outcome: "do proper automation",
//                 actual_outcome: null,
//                 sub_outcomes: null,
//                 month: "September",
//                 completion_percent: null,
//                 contribution: null,
//                 attachments: null,
//                 status: "pending",
//               },
//             ],
//           },
//         ],
//         status: "pending",
//         weight: "50.00",
//       },
//       {
//         id: "01j96s79fnrs1823adj01scd9s",
//         task: "complete automation tests on zojapay",
//         success_measures: [
//           {
//             id: "01j96qxnhg5z6a3qeexjykmtty",
//             measure: "completion of tsts",
//           },
//         ],
//         strategic_pillars: [
//           {
//             id: "01j91e1c7erknnazswqms99c8w",
//             title: "Productivity",
//           },
//           {
//             id: "01j91e1ce2e5p1vqcph6j0ktb4",
//             title: "Innovation",
//           },
//           {
//             id: "01j91e1cmmb7brkkpf0kv8n14v",
//             title: "Integrity",
//           },
//           {
//             id: "01j91e1cv7v370m1gvn90p0xae",
//             title: "Resilience",
//           },
//         ],
//         start_date: "2024-10-02",
//         end_date: "2025-03-20",
//         is_main_effort: 0,
//         line_manager_implied_task: {
//           id: "01j91ngg7tvcqz27g3hpsdkkbp",
//           task: "AUTOMATE MANCE WEB",
//         },
//         implied_tasks: [
//           {
//             id: "01j96tk8gkt21791r422vrsaxr",
//             resources: [
//               {
//                 staff_member_id: "01j91fn4cg1d7mg38a7hd54h0y",
//                 name: "Oluwafemi Osadebe",
//                 percentage: "100.00",
//               },
//             ],
//             task: "run the automation every weekend",
//             weight: "100",
//             percentage: null,
//             start_date: "2024-11-29",
//             end_date: "2025-06-11",
//             status: "pending",
//             task_outcome: [
//               {
//                 id: "01j970d8sa0pqe6bsdqgjn7kw9",
//                 fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//                 mission_plan_id: "01j91gakxzxajjbstgrq3h6zx5",
//                 expected_outcome: "document, monitor, report",
//                 actual_outcome: null,
//                 sub_outcomes: null,
//                 month: "January",
//                 completion_percent: null,
//                 contribution: null,
//                 attachments: null,
//                 status: "pending",
//               },
//               {
//                 id: "01j97fv88p2fhzchkbkt5w9jyz",
//                 fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//                 mission_plan_id: "01j91gakxzxajjbstgrq3h6zx5",
//                 expected_outcome: "document, monitor, report",
//                 actual_outcome: "Done my tasks to some extent",
//                 sub_outcomes: null,
//                 month: "June",
//                 completion_percent: null,
//                 contribution: null,
//                 attachments: null,
//                 status: "pending",
//               },
//             ],
//           },
//         ],
//         status: "pending",
//         weight: "50.00",
//       },
//     ],
//   },
// };
