import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import ChevronDoubleRightIcon from "@heroicons/react/24/solid/ChevronDoubleRightIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewMostAssists = (props) => {
  const { stats, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Most Assists
            </Typography>
            <Typography variant="h4">{stats.value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ChevronDoubleRightIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="body">
            {stats.player}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewMostAssists.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
