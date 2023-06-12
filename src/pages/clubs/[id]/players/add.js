import Head from "next/head";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PlayerProfile } from "src/sections/player/player-profile";
import { PlayerProfileDetails } from "src/sections/player/player-profile-details";
import prisma from "src/lib/prisma";
import axios from "axios";

const Page = ({ club }) => {
  const router = useRouter();
  const [player, setPlayer] = useState({
    name: "",
    position: "",
    jerseyNumber: "",
    clubId: club.id,
  });

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const res = await axios.post("/api/players/create", player);
        const resJson = res.data;

        alert(`${resJson.data.name} has been saved successfully`);
        router.replace(`/clubs/${club.id}/players`);
      } catch (e) {
        console.log(e);
        alert("There was a problem adding the player");
      }
    },
    [player]
  );

  return (
    <>
      <Head>
        <title>Player | {club.name}</title>
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
                  <PlayerProfile {...player} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <PlayerProfileDetails
                    {...player}
                    setPlayer={setPlayer}
                    handleSubmit={handleSubmit}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  const club = await prisma.club.findFirst({ where: { id } });

  return { props: { club } };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
