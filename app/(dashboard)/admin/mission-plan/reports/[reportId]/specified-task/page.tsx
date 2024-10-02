"use client"

import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout'
import MetricTableCard from '@/components/card/metric-table-card';
import CustomSelect from '@/components/custom-select';
import ChallengeDrawer from '@/components/drawer/challenge-drawer';
import { ActionLabel, CardContainer, GridLegend, ReusableProgress, ReusableSegmentProgress } from '@/components/fragment';
import { exportIcon, filterIcon, undoIcon } from '@/public/svgs';
import { getProgressColorByValue } from '@/utils/helpers';
import React from 'react'
import { CHALLENGES_DATA } from '../../_data';
import CustomCommentDrawer from '@/components/drawer/comment-drawer';

export default function OrganizationSpecifiedTask() {
  const [showChallengeModal, setShowChallengeModal] = React.useState(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);

  const segments = [
    {
      percentage: 30,
      color: getProgressColorByValue(30),
    },
    {
      percentage: 60,
      color: "#ffdb57",
    },
    {
      percentage: 90,
      color: getProgressColorByValue(90),
    },
    {
      percentage: 50,
      color: "#ffdb57",
    },
  ];

  const progressDesc = [
    {
      label: "In Progress",
      color: "yellow",
      value: 24,
    },
    {
      label: "Completed",
      color: "green",
      value: 73,
    },
    {
      label: "Under Review",
      color: "blue",
      value: 57,
    },
    {
      label: "Overdue",
      color: "red",
      value: 22,
    },
  ];

  const specifiedTaskDetails = [
    {
      title: "Achieve Revenue from sales of Zojatech Products",
      weight: 50,
      percentage: 67,
      color: "yellow",
      measureOfSuccessDetails: [
        {
          label: "30 online Campaign",
          bgColor: "#6B51DF1A",
          textColor: "#6B51DF",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#119C2B1A",
          textColor: "#119C2B",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#0452C81A",
          textColor: "#0452C8",
        },
      ],
      tasks: [
        {
          title: "Sell and Market Revvex as a user product",
          weight: 50,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach Proposed Audience",
          weight: 20,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach New Audience",
          weight: 30,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
      ],
    },
    {
      title: "Achieve Revenue from sales of Zojatech Products",
      weight: 50,
      percentage: 48,
      color: "red",
      measureOfSuccessDetails: [
        {
          label: "30 online Campaign",
          bgColor: "#6B51DF1A",
          textColor: "#6B51DF",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#119C2B1A",
          textColor: "#119C2B",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#0452C81A",
          textColor: "#0452C8",
        },
      ],
      tasks: [
        {
          title: "Sell and Market Revvex as a user product",
          weight: 50,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach Proposed Audience",
          weight: 20,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach New Audience",
          weight: 30,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
      ],
    },
    {
      title: "Achieve Revenue from sales of Zojatech Products",
      weight: 50,
      percentage: 80,
      color: "green",
      measureOfSuccessDetails: [
        {
          label: "30 online Campaign",
          bgColor: "#6B51DF1A",
          textColor: "#6B51DF",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#119C2B1A",
          textColor: "#119C2B",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#0452C81A",
          textColor: "#0452C8",
        },
      ],
      tasks: [
        {
          title: "Sell and Market Revvex as a user product",
          weight: 50,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach Proposed Audience",
          weight: 20,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach New Audience",
          weight: 30,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
      ],
    },
    {
      title: "Achieve Revenue from sales of Zojatech Products",
      weight: 50,
      percentage: 48,
      color: "red",
      measureOfSuccessDetails: [
        {
          label: "30 online Campaign",
          bgColor: "#6B51DF1A",
          textColor: "#6B51DF",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#119C2B1A",
          textColor: "#119C2B",
        },
        {
          label: "$100,000 Revenue",
          bgColor: "#0452C81A",
          textColor: "#0452C8",
        },
      ],
      tasks: [
        {
          title: "Sell and Market Revvex as a user product",
          weight: 50,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach Proposed Audience",
          weight: 20,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
        {
          title: "Create Marketing Campaigns to Reach New Audience",
          weight: 30,
          impliedTasks: [
            {
              period_cycle: "Q1",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "January",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "February",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "March",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q2",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "April",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "May",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "June",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q3",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "July",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "August",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "September",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
            {
              period_cycle: "Q4",
              expected_outcome: "Sell and Market Revvex as a user product",
              achieved_outcome: "Sell and Market Revvex as a user product",
              sub_outcomes: [
                {
                  date: "October",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "November",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
                {
                  date: "December",
                  achieved_outcome: "Sell and Market Revvex as a user product",
                  expected_outcome: "Sell and Market Revvex as a user product",
                },
              ],
              percentage_completion: 30,
            },
          ],
        },
      ],
    },
  ];

  return (
    <DashboardLayout
      headerTitle='Specified Task Overview'
      back
    >
      <section className='p-5'>
        <CardContainer>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ActionLabel label='Filter' icon={filterIcon} iconPosition='right' />

              <div className="flex items-center">
                <CustomSelect
                  placeholder="FY"
                  options={[]}
                  selected={""}
                  setSelected={(e: any) => {
                    // setFiscalYear(e);
                  }}
                  className="w-[150px] text-xs rounded-none rounded-l-[15px]"
                />
                <CustomSelect
                  placeholder="Cycle"
                  options={[]}
                  selected={""}
                  setSelected={(e: any) => {
                    // setMissionCycle(e);
                  }}
                  className="w-[150px] text-xs rounded-none rounded-r-[15px]"
                />
              </div>
              <ActionLabel label='Reset' icon={undoIcon} className='text-red-500' iconPosition='right' labelClass='text-red-500' />
            </div>

            {/* -----EXPORT---- */}
            <ActionLabel label='Export' icon={exportIcon} iconPosition='left' className='border border-[#E5E9EB] p-3 rounded-[6px] bg-[#FFFFFF]' labelClass='text-xs text-[#6E7C87]' />
          </div>
        </CardContainer>

        <CardContainer className="mt-10">

          {/* flex flex-col gap-4  */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1>Organization Task Activity</h1>
              <span className="text-xs text-gray-400 font-light">March 2023 - March 31, 2024</span>
            </div>
            <p>Total Tasks: {50}</p>
          </div>

          {/* -------MULTI PROGRESS BAR------ */}
          <div className="mt-10">
            <ReusableSegmentProgress
              value={100}
              height={6}
              segments={segments}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-4 items-center mt-5 ">
                {progressDesc.map((chi, idx) => {
                  const { label, color, value } = chi;
                  return (
                    <GridLegend
                      key={idx}
                      color={color as any}
                      label={label}
                      value={value}
                    />
                  );
                })}
              </div>

            </div>
          </div>
          {/* -------MULTI PROGRESS BAR------ */}
        </CardContainer>

        <h1 className='mt-8 text-gray-600'>Organization Specific Task</h1>
        <div className="mt-3 relative p-0 pb-8">
          {specifiedTaskDetails.map((chi, idx) => {
            const {
              title,
              weight,
              percentage,
              tasks,
              measureOfSuccessDetails,
              color,
            } = chi;
            return (
              <MetricTableCard
                key={idx}
                title={title}
                percentage={percentage}
                measureOfSuccessDetails={measureOfSuccessDetails}
                tasks={tasks}
                progressValue={percentage}
                progressColor={color as "red"}
                onClickViewChallenge={() => setShowChallengeModal(true)}
                onClickComment={() => setShowCommentModal(true)}
              />
            );
          })}
        </div>
      </section>
      <ChallengeDrawer
        open={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        data={CHALLENGES_DATA}
      />
      <CustomCommentDrawer
        open={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        id={'modalId'}
        data={[]}
        handleSubmit={(value) => {
          // console.log(value, "comment");
        }}
        commentType="specified-task"
      />
    </DashboardLayout>
  )
}
