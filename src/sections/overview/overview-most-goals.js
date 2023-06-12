import PropTypes from "prop-types";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewMostGoals = (props) => {
  const { sx, stats } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Most Goals
            </Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ChevronRightIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="body">
            {stats.name}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewMostGoals.prototypes = {
  stats: PropTypes.object,
  sx: PropTypes.object,
};
