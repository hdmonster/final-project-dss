import Head from "next/head";
import { useState } from "react";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PlayerProfile } from "src/sections/player/player-profile";
import { PlayerProfileDetails } from "src/sections/player/player-profile-details";

const Page = () => {
  const [player, setPlayer] = useState({
    firstName: null,
    lastName: null,
    position: null,
    jerseyNumber: null,
  });

  return (
    <>
      <Head>
        <title>Player | Club Name</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Player</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <PlayerProfile player={player} setPlayer={setPlayer} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <PlayerProfileDetails player={player} setPlayer={setPlayer} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
