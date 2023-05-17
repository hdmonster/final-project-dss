import PropTypes from "prop-types";
import CreditCardIcon from "@heroicons/react/24/solid/CreditCardIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewMostCards = (props) => {
  const { stats, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Most Cards
            </Typography>
            <Typography variant="h4">{stats.value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CreditCardIcon />
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

OverviewMostCards.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
