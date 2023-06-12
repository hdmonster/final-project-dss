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

export const PlayerProfile = ({ name, position, jerseyNumber }) => (
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
          src={""}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        >
          <Typography variant="h4">{jerseyNumber == "" ? 0 : jerseyNumber}</Typography>
        </Avatar>
        <Typography gutterBottom variant="h5">
          {name == "" ? "Name" : name}
        </Typography>
        <Typography color="text.secondary" variant="body2"></Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        {position === "" ? "Position" : position}
      </Button>
    </CardActions>
  </Card>
);
