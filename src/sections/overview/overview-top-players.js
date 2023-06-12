import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewTopPlayers = (props) => {
  const { players, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Top Rated Players" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Goals/Assists/Cards</TableCell>
                <TableCell>Club</TableCell>
                <TableCell sortDirection="desc">Rating (2.0)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => {
                return (
                  <TableRow hover key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.position.replace(/_/g, " ")}</TableCell>
                    <TableCell>{player.stats}</TableCell>
                    <TableCell>{player.club}</TableCell>
                    <TableCell>{player.rating}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
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

OverviewTopPlayers.prototype = {
  players: PropTypes.array,
  sx: PropTypes.object,
};
