import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

const widgetData = [
  { title: "Weekly Transactions", total: 714000, color: "success" },
  { title: "BNPL Users", total: 1723315, color: "warning" },
  { title: "BNPL Premium Users", total: 1352831, color: "info" },
  { title: "Failure", total: 80, color: "error" },
];

const chartData = {
  labels: [
    '01/01/2024',
    '02/01/2024',
    '03/01/2024',
    '04/01/2024',
    '05/01/2024',
    '06/01/2024',
    '07/01/2024'
  ],
  series: [
    {
      name: 'Turnover',
      type: 'column',
      fill: 'solid',
      data: [23, 11, 22, 27, 13, 22, 32],
    },
    {
      name: 'New Cutomers',
      type: 'area',
      fill: 'gradient',
      data: [44, 55, 41, 49, 30, 43, 40],
    },
    {
      name: 'Number of Orders',
      type: 'line',
      fill: 'solid',
      data: [20, 25, 36, 30, 45, 35, 35],
    },
  ],
};

const AppView = () => (
  <Container maxWidth="xl">
    <Typography variant="h4" sx={{ mb: 5 }}>
      Hi, Welcome back 👋
    </Typography>

    <Grid container spacing={3}>
      {widgetData.map((item, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={item.title}
            total={item.total}
            color={item.color}
          />
        </Grid>
      ))}

      <Grid xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title="Financial Overview"
          subheader="(+43%) than last year"
          chart={chartData}
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title="BNPL Customers"
          chart={{
            series: [
              { label: 'Umbrella Corporation', value: 4344 },
              { label: 'Hooli', value: 5435 },
              { label: 'Initech', value: 1443 },
              { label: 'Globex Corporation', value: 4443 },
            ],
          }}
        />
      </Grid>
    </Grid>
  </Container>
);

export default AppView;
