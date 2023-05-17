import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

export const OverviewTopTeams = (props) => {
  const { teams = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Top Performing Teams" />
      <List>
        {teams.map((team, index) => {
          const hasDivider = index < teams.length - 1;

          return (
            <ListItem divider={hasDivider} key={team.id}>
              <ListItemAvatar>
                {team.image ? (
                  <Box
                    component="img"
                    src={team.image}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={team.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`${team.stats.win}W  ${team.stats.lose}L | Goals: ${team.stats.goals}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewTopTeams.propTypes = {
  teams: PropTypes.array,
  sx: PropTypes.object,
};
