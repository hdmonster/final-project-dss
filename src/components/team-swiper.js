import { Box, Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";

// Default theme
import "@splidejs/react-splide/css";
import { setAwayData, setHomeData } from "src/slices/match";
import { useDispatch } from "src/store";

const TeamSwiper = ({ teams, teamType }) => {
  const dispatch = useDispatch();

  return (
    <Splide
      aria-label="teams"
      options={{
        rewind: true,
        width: 400,
        trimSpace: false,
        pagination: false,
        focus: "center",
        perPage: 1,
      }}
      onArrowsUpdated={(splide, prev, next) => {
        try {
          const currentTeamId = teams[splide.index].id;
          if (teamType == "home") dispatch(setHomeData({ id: currentTeamId }));
          else dispatch(setAwayData({ id: currentTeamId }));
        } catch (e) {
          console.log("on arrow update error: " + e.message);
        }
      }}
    >
      {teams.map((team) => {
        return (
          <SplideSlide key={team.id}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Image
                alt="Team"
                src={team.logoUrl}
                style={{ objectFit: "contain" }}
                width={80}
                height={80}
              />
              <Typography gutterBottom variant="h5" sx={{ mt: 2 }}>
                {team.name}
              </Typography>
            </Box>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default TeamSwiper;
