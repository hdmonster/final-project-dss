import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import TransferList from "src/components/transfer-list";

export const MatchStartingEleven = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Manage team starting eleven" title="Starting Eleven" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid xs={12} sm={12} md={12}>
              <Stack spacing={1}>
                <Typography variant="h6" align="center">
                  Home
                </Typography>
                <TransferList />
              </Stack>
            </Grid>
            <Grid md={12} sm={12} xs={12}>
              <Stack spacing={1}>
                <Typography variant="h6" align="center">
                  Away
                </Typography>
                <TransferList />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
};
