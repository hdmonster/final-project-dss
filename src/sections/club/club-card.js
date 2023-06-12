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
import Image from "next/image";

export const ClubCard = (props) => {
  const { club } = props;

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
          <Image
            alt="Team logo"
            src={club.logoUrl}
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5" sx={{ mt: 2 }}>
          {club.name}
        </Typography>
        <Typography align="center" variant="body1">
          {club._count.players} Players
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
          <Link href={`/clubs/${club.id}/players`}>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              }
            >
              Players
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
