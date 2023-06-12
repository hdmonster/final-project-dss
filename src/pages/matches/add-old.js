import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsPassword } from "src/sections/settings/settings-password";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MatchStartingEleven } from "src/sections/match/add/match-starting-eleven";

const Page = () => (
  <>
    <Head>
      <title>Add Match | Home vs Away</title>
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
          <Typography variant="h4">Add Match</Typography>
          <MatchStartingEleven />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
