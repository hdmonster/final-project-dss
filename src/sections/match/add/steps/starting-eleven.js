import * as React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import TransferList from "src/components/transfer-list";
import { useSelector } from "src/store";
import { selectTeams } from "src/slices/team";

const StartingEleven = () => {
  const teams = useSelector(selectTeams);
  const homeId = useSelector((state) => state.match.home.id);
  const awayId = useSelector((state) => state.match.away.id);

  const homePlayers = teams.filter((team) => team.id == homeId)[0].players;
  const awayPlayers = teams.filter((team) => team.id == awayId)[0].players;

  return (
    <Grid container spacing={6} wrap="wrap">
      <Grid item={true} xs={12} sm={12} md={12}>
        <Stack spacing={1}>
          <Typography variant="h6" align="center">
            Home
          </Typography>
          {homePlayers.length > 0 ? (
            <TransferList teamType="home" players={homePlayers} />
          ) : (
            <Typography>Loading players</Typography>
          )}
        </Stack>
      </Grid>
      <Grid item={true} md={12} sm={12} xs={12} sx={{ pt: 4 }}>
        <Stack spacing={1}>
          <Typography variant="h6" align="center">
            Away
          </Typography>
          {homePlayers.length > 0 ? (
            <TransferList teamType="away" players={awayPlayers} />
          ) : (
            <Typography>Loading players</Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default StartingEleven;
