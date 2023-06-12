import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewMostGoals } from "src/sections/overview/overview-most-goals";
import { OverviewTopPlayers } from "src/sections/overview/overview-top-players";
import { OverviewTopTeams } from "src/sections/overview/overview-top-teams";
import { OverviewMostWin } from "src/sections/overview/overview-most-win";
import { OverviewMostAssists } from "src/sections/overview/overview-most-assists";
import { OverviewMostCards } from "src/sections/overview/overview-most-cards";
import axios from "axios";

const now = new Date();

const Page = ({ data }) => (
  <>
    <Head>
      <title>Overview | DSS 4</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostWin sx={{ height: "100%" }} stats={data.cards.mostWin} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostGoals sx={{ height: "100%" }} stats={data.cards.mostGoals} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostAssists sx={{ height: "100%" }} stats={data.cards.mostAssists} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostCards sx={{ height: "100%" }} stats={data.cards.mostCards} />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTopTeams teams={data.topPerformingTeam} sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewTopPlayers players={data.topRatedPlayers} sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export const getServerSideProps = async (req) => {
  const res = await axios.get("http://localhost:3000/api/dashboard");
  const data = res.data;

  return { props: { data } };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
