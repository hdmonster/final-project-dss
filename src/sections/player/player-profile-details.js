import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const position = [
  {
    value: null,
    label: "Select",
  },
  {
    value: "Goalkeeper",
    label: "Goalkeeper",
  },
  {
    value: "Outside Back",
    label: "Outside Back",
  },
  {
    value: "Center Back",
    label: "Center Back",
  },
  {
    value: "Striker",
    label: "Striker",
  },
  {
    value: "Second Striker",
    label: "Second Striker",
  },
  {
    value: "Defensive Midfielder",
    label: "Defensive Midfielder",
  },
  {
    value: "Central Midfielder",
    label: "Central Midfielder",
  },
  {
    value: "Winger",
    label: "Winger",
  },
];

export const PlayerProfileDetails = ({ player, setPlayer }) => {
  const handleChange = useCallback((event) => {
    setPlayer((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={player.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={player.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select position"
                  name="position"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={player.position}
                >
                  {position.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Jersey number"
                  name="jerseyNumber"
                  onChange={handleChange}
                  required
                  value={player.jerseyNumber}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
};
