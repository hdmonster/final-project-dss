import PropTypes from "prop-types";
import Cog6Tooth from "@heroicons/react/24/solid/Cog6ToothIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const ClubCard = (props) => {
  const { club } = props;

  const editPlayerUrl = `/clubs/${club.id}/starting-eleven`;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={club.logo} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {club.title}
        </Typography>
        <Typography align="center" variant="body1">
          12 Players
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <Link href={editPlayerUrl}>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              }
            >
              Starting Eleven
            </Button>
          </Link>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Link href={"/clubs/" + club.id + "/configure"}>
            <Button
              color="info"
              startIcon={
                <SvgIcon fontSize="small">
                  <Cog6Tooth />
                </SvgIcon>
              }
            >
              Configure
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
};

ClubCard.propTypes = {
  club: PropTypes.object.isRequired,
};
