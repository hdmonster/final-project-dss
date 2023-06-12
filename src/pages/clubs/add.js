import Head from "next/head";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ClubProfile } from "src/sections/club/club-profile";
import { ClubProfileDetails } from "src/sections/club/club-profile-details";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [club, setClub] = useState({
    name: "",
    logoUrl: "",
  });

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const res = await axios.post("/api/clubs/create", club);
        const resJson = res.data;

        alert(`${resJson.data.name} has been saved successfully`);
        router.replace(`/clubs`);
      } catch (e) {
        alert("There was a problem creating the club");
      }
    },
    [club]
  );

  return (
    <>
      <Head>
        <title>Add Club | DSS 4</title>
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
              <Typography variant="h4">Club</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <ClubProfile {...club} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <ClubProfileDetails {...club} setClub={setClub} handleSubmit={handleSubmit} />
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
