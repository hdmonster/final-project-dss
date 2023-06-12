import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ClubProfile } from "src/sections/club/club-profile";
import { ClubProfileDetails } from "src/sections/club/club-profile-details";
import prisma from "src/lib/prisma";

const Page = ({ data }) => (
  <>
    <Head>
      <title>{data.name} | Configure</title>
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
                <ClubProfile {...data} />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <ClubProfileDetails {...data} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

export const getServerSideProps = async ({ query }) => {
  const { id } = query;

  const data = await prisma.club.findFirst({
    where: { id },
  });

  console.log(data);

  return { props: { data } };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
