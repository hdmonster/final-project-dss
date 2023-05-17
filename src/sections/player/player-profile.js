import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const PlayerProfile = ({ player, setPlayer }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={player.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        >
          <Typography variant="h4">{player.jerseyNumber ?? 0}</Typography>
        </Avatar>
        <Typography gutterBottom variant="h5">
          {player.firstName ?? "Name"} {player.lastName}
        </Typography>
        <Typography color="text.secondary" variant="body2"></Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        {player.position ?? "Position"}
      </Button>
    </CardActions>
  </Card>
);
