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
import Image from "next/image";
import { getInitials } from "src/utils/get-initials";
import { isValidLink } from "src/utils/valid-link";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

export const ClubProfile = ({ name, logoUrl }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {logoUrl == "" || !isValidLink(logoUrl) ? (
          <Avatar src="#" style={{ height: 80, width: 80 }}>
            {getInitials(name)}
          </Avatar>
        ) : (
          <Image
            alt="Team logo"
            style={{ objectFit: "contain" }}
            src={logoUrl}
            height={80}
            width={80}
          />
        )}
        <Typography gutterBottom variant="h5" sx={{ mt: 2 }}>
          {name == "" ? "Club name" : name}
        </Typography>
        <Typography color="text.secondary" variant="body2"></Typography>
        <Typography color="text.secondary" variant="body2"></Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text"></Button>
    </CardActions>
  </Card>
);
