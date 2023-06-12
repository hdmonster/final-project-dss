import * as React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MatchDataList from "src/components/match-data-list";
import AddGoalsForm from "../../components/add-goals-form";
import { useDispatch, useSelector } from "src/store";
import { selectMatchAway, selectMatchHome, setAwayData, setHomeData } from "src/slices/match";
import { useEffect } from "react";

const GoalsAndAssists = () => {
  const dispatch = useDispatch();
  const home = useSelector(selectMatchHome);
  const away = useSelector(selectMatchAway);

  const [goalsHome, setGoalsHome] = React.useState([]);
  const [goalsAway, setGoalsAway] = React.useState([]);

  const [openHomeForm, setOpenHomeForm] = React.useState(false);
  const [openAwayForm, setOpenAwayForm] = React.useState(false);

  useEffect(() => {
    dispatch(setHomeData({ goals: goalsHome, score: goalsHome.length }));
    dispatch(setAwayData({ goals: goalsAway, score: goalsAway.length }));
  }, [dispatch, goalsHome, goalsAway]);

  const handleSaveAndClose = (data, teamType) => {
    teamType == "home" ? setGoalsHome([...goalsHome, data]) : setGoalsAway([...goalsAway, data]);
    handleClose();
  };

  const handleClose = () => {
    setOpenHomeForm(false);
    setOpenAwayForm(false);
  };

  const handleDeleteData = (teamType, deletedData) => {
    if (teamType == "home") {
      const updatedGoalsHome = goalsHome.filter((goal) => goal !== deletedData);
      setGoalsHome(updatedGoalsHome);
    } else {
      const updatedGoalsAway = goalsAway.filter((goal) => goal !== deletedData);
      setGoalsAway(updatedGoalsAway);
    }
  };

  return (
    <>
      <AddGoalsForm
        open={openHomeForm}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        players={home.startingEleven}
        teamType="home"
      />
      <AddGoalsForm
        open={openAwayForm}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        players={away.startingEleven}
        teamType="away"
      />
      <Grid container spacing={6} wrap="wrap">
        <Grid item={true} xs={12} sm={12} md={12}>
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
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", py: 4 }}
            >
              <Grid item={true} xs={12} sm={12} md={6}>
                <MatchDataList title="Goals" records={home.goals} />
              </Grid>
              <Grid item={true} xs={12} sm={12} md={6}>
                <MatchDataList
                  title="Assists"
                  teamType="home"
                  records={home.goals}
                  handleDeleteData={handleDeleteData}
                  hasDeleteButton
                />
              </Grid>
            </Box>
          </Stack>
        </Grid>
        <Grid item={true} md={12} sm={12} xs={12} sx={{ pt: 4 }}>
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
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", py: 4 }}
            >
              <Grid item={true} xs={12} sm={12} md={6}>
                <MatchDataList title="Goals" records={away.goals} />
              </Grid>
              <Grid item={true} xs={12} sm={12} md={6}>
                <MatchDataList
                  title="Assists"
                  teamType="away"
                  records={away.goals}
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

export default GoalsAndAssists;
