import { useCallback } from "react";
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

const positions = [
  {
    value: null,
    label: "Select",
  },
  {
    value: "GOALKEEPER",
    label: "Goalkeeper",
  },
  {
    value: "OUTSIDE_BACK",
    label: "Outside Back",
  },
  {
    value: "CENTER_BACK",
    label: "Center Back",
  },
  {
    value: "STRIKER",
    label: "Striker",
  },
  {
    value: "SECOND_STRIKER",
    label: "Second Striker",
  },
  {
    value: "DEFENSIVE_MIDFIELDER",
    label: "Defensive Midfielder",
  },
  {
    value: "CENTRAL_MIDFIELDER",
    label: "Central Midfielder",
  },
  {
    value: "WINGER",
    label: "Winger",
  },
];

export const PlayerProfileDetails = ({ name, position, jerseyNumber, setPlayer, handleSubmit }) => {
  const handleChange = useCallback((event) => {
    setPlayer((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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
                  helperText="Please specify the player name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={name}
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
                  value={position}
                >
                  {positions.map((option) => (
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
                  value={jerseyNumber}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="action">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
