import { CHALLENGES_DATA } from "@/app/(dashboard)/admin/mission-plan/reports/_data";
import MetricTableCard from "@/components/card/metric-table-card";
import ChallengeDrawer from "@/components/drawer/challenge-drawer";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import { useState } from "react";

const SpecifiedTaskDetailView = () => {
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
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 mt-5">
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
      <ChallengeDrawer
        open={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        data={CHALLENGES_DATA}
      />
      <CustomCommentDrawer
        open={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        id={"modalId"}
        data={[]}
        handleSubmit={(value) => {
          // console.log(value, "comment");
        }}
        commentType="specified-task"
      />
    </div>
  );
};

export default SpecifiedTaskDetailView;
