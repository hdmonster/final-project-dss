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

export const ClubProfileDetails = ({ name, logoUrl, setClub = null, handleSubmit }) => {
  const handleChange = useCallback((event) => {
    setClub((prevState) => ({
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
                  helperText="Please specify the club name"
                  label="Club name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Logo URL"
                  name="logoUrl"
                  onChange={handleChange}
                  required
                  value={logoUrl}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="action" disabled>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
