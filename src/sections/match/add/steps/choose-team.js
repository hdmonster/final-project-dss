import { Box, Typography } from "@mui/material";
import TeamSwiper from "src/components/team-swiper";
import { selectTeams } from "src/slices/team";
import { useSelector } from "src/store";

const ChooseTeam = () => {
  const teams = useSelector(selectTeams);

  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {teams.length > 0 ? (
          <TeamSwiper teams={teams} teamType="home" />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
      <Typography variant="h4" sx={{ px: 8 }}>
        vs
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {teams.length > 0 ? (
          <TeamSwiper teams={teams} teamType="away" />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </>
  );
};

export default ChooseTeam;
