import * as React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MatchDataList from "src/components/match-data-list";
import AddCardsForm from "../../components/add-cards-form";
import { useDispatch, useSelector } from "src/store";
import { selectMatchAway, selectMatchHome, setAwayData, setHomeData } from "src/slices/match";

const Cards = () => {
  const dispatch = useDispatch();
  const home = useSelector(selectMatchHome);
  const away = useSelector(selectMatchAway);

  const [cardsHome, setCardsHome] = React.useState([]);
  const [cardsAway, setCardsAway] = React.useState([]);

  const [openHomeForm, setOpenHomeForm] = React.useState(false);
  const [openAwayForm, setOpenAwayForm] = React.useState(false);

  React.useEffect(() => {
    dispatch(setHomeData({ cards: cardsHome }));
    dispatch(setAwayData({ cards: cardsAway }));
  }, [dispatch, cardsHome, cardsAway]);

  const handleSaveAndClose = (data, teamType) => {
    teamType == "home" ? setCardsHome([...cardsHome, data]) : setCardsAway([...cardsAway, data]);
    handleClose();
  };

  const handleClose = () => {
    setOpenHomeForm(false);
    setOpenAwayForm(false);
  };

  const handleDeleteData = (teamType, deletedData) => {
    if (teamType == "home") {
      const updatedGoalsHome = cardsHome.filter((card) => card !== deletedData);
      setCardsHome(updatedGoalsHome);
    } else {
      const updatedGoalsAway = cardsAway.filter((card) => card !== deletedData);
      setCardsAway(updatedGoalsAway);
    }
  };

  return (
    <>
      <AddCardsForm
        open={openHomeForm}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        players={home.startingEleven}
        teamType="home"
      />
      <AddCardsForm
        open={openAwayForm}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        players={away.startingEleven}
        teamType="away"
      />
      <Grid item={true} container spacing={6} wrap="wrap">
        <Grid item={true} xs={12} sm={12} md={6}>
          <Stack spacing={1}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2 }}
            >
              <Typography variant="h6" align="center">
                Home
              </Typography>
              <Button variant="text" onClick={() => setOpenHomeForm(true)}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", py: 4 }}>
              <Grid item={true} xs={12} sm={12} md={12}>
                <MatchDataList
                  title="Receiver"
                  teamType="home"
                  records={home.cards}
                  handleDeleteData={handleDeleteData}
                  hasDeleteButton
                />
              </Grid>
            </Box>
          </Stack>
        </Grid>
        <Grid item={true} md={6} sm={12} xs={12}>
          <Stack spacing={1}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2 }}
            >
              <Typography variant="h6" align="center">
                Away
              </Typography>
              <Button variant="text" onClick={() => setOpenAwayForm(true)}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", py: 4 }}>
              <Grid item={true} xs={12} sm={12} md={6}>
                <MatchDataList
                  title="Receiver"
                  teamType="away"
                  records={away.cards}
                  handleDeleteData={handleDeleteData}
                  hasDeleteButton
                />
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Cards;
