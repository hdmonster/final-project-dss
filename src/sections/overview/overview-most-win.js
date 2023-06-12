import PropTypes from "prop-types";
import TrophyIcon from "@heroicons/react/24/solid/TrophyIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewMostWin = (props) => {
  const { stats, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              Most Win
            </Typography>
            <Typography variant="h4">{stats.matchesWon}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <TrophyIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="body">
            {stats.clubName}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewMostWin.propTypes = {
  stats: PropTypes.object,
  sx: PropTypes.object,
};
