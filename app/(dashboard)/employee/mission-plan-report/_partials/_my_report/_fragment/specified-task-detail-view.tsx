import MetricTableCard from "@/components/card/metric-table-card";

const SpecifiedTaskDetailView = () => {
  // const measureOfSuccessDetails = [
  //   {
  //     label: "30 online Campaign",
  //     bgColor: "#6B51DF1A",
  //     textColor: "#6B51DF",
  //   },
  //   {
  //     label: "$100,000 Revenue",
  //     bgColor: "#119C2B1A",
  //     textColor: "#119C2B",
  //   },
  //   {
  //     label: "$100,000 Revenue",
  //     bgColor: "#0452C81A",
  //     textColor: "#0452C8",
  //   },
  // ];

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
      impliedTaskDetails: [
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
      impliedTaskDetails: [
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
      impliedTaskDetails: [
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
      impliedTaskDetails: [
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
  ];

  return (
    <div>
      {specifiedTaskDetails.map((chi, idx) => {
        const {
          title,
          weight,
          percentage,
          impliedTaskDetails,
          measureOfSuccessDetails,
          color,
        } = chi;
        return (
          <MetricTableCard
            key={idx}
            num={idx + 1}
            title={title}
            weight={weight}
            percentage={percentage}
            measureOfSuccessDetails={measureOfSuccessDetails}
            impliedTaskDetails={impliedTaskDetails}
            progressValue={percentage}
            progressColor={color as "red"}
          />
        );
      })}
      {/* <MetricTableCard
        measureOfSuccessDetails={measureOfSuccessDetails}
        impliedTaskDetails={impliedTaskDetails}
      />
      <MetricTableCard
        measureOfSuccessDetails={measureOfSuccessDetails}
        impliedTaskDetails={impliedTaskDetails}
      /> */}
    </div>
  );
};

export default SpecifiedTaskDetailView;
