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

const now = new Date();

const Page = ({ stats, teams, players }) => (
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
            <OverviewMostWin sx={{ height: "100%" }} stats={stats.mostWin} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostGoals sx={{ height: "100%" }} stats={stats.mostGoals} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostAssists sx={{ height: "100%" }} stats={stats.mostAssists} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewMostCards sx={{ height: "100%" }} stats={stats.mostCards} />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTopTeams teams={teams} sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewTopPlayers players={players} sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export const getServerSideProps = async (req) => {
  const stats = {
    mostWin: {
      team: "Real Madrid",
      value: 12,
    },
    mostGoals: {
      player: "Lionel Messi",
      value: 40,
    },
    mostAssists: {
      player: "Tristan Tate",
      value: 103,
    },
    mostCards: {
      player: "John Doe",
      value: 8,
    },
  };

  const teams = [
    {
      id: "5ece2c077e39da27658aa8a9",
      logo_url: "/assets/products/product-1.png",
      name: "Real Madrid",
      stats: {
        win: 0,
        lose: 0,
        goals: 0,
      },
    },
    {
      id: "5ece2c0d16f70bff2cf86cd8",
      logo_url: "/assets/products/product-2.png",
      name: "FC Barcelona",
      stats: {
        win: 0,
        lose: 0,
        goals: 0,
      },
    },
    {
      id: "b393ce1b09c1254c3a92c827",
      logo_url: "/assets/products/product-5.png",
      name: "PSG",
      stats: {
        win: 0,
        lose: 0,
        goals: 0,
      },
    },
    {
      id: "a6ede15670da63f49f752c89",
      logo_url: "/assets/products/product-6.png",
      name: "Man City",
      stats: {
        win: 0,
        lose: 0,
        goals: 0,
      },
    },
    {
      id: "bcad5524fe3a2f8f8620ceda",
      logo_url: "/assets/products/product-7.png",
      name: "Inter Milan",
      stats: {
        win: 0,
        lose: 0,
        goals: 0,
      },
    },
  ];

  const players = [
    {
      id: "f69f88012978187a6c12897f",
      name: "Lionel Messi",
      position: "Striker",
      jerseyNumber: 1555016400000,
      club: "PSG",
      stats: {
        goals: 0,
        assists: 0,
        cards: 0,
      },
      rating: "2.0",
    },
  ];

  return { props: { stats, teams, players } };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
