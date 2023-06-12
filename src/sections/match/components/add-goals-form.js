import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from "@mui/material";
import * as React from "react";
import DefaultSelect from "src/components/default-select";

export default function AddGoalsForm({ open, handleClose, handleSaveAndClose, players, teamType }) {
  const [goal, setGoal] = React.useState({
    scorer: {},
    assister: {},
    time: 0,
  });

  const handleClearState = () => {
    setGoal({ scorer: {}, assister: {}, time: 0 });
  };

  const handleChange = (event, val) => {
    if (event.target.name == "time") setGoal({ ...goal, [event.target.name]: val });
    else setGoal({ ...goal, [event.target.name]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add goal and assist record</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText> */}

        <DefaultSelect
          name="scorer"
          label="Goalscorer"
          options={players}
          state={goal.scorer}
          handleChange={handleChange}
        />
        <DefaultSelect
          name="assister"
          label="Assister"
          options={players}
          state={goal.assister}
          handleChange={handleChange}
        />
        <Box>
          <Slider
            name="time"
            size="small"
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            max={90}
            onChange={handleChange}
          />
          <Typography variant="caption">Score at minute {goal.time}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSaveAndClose(goal, teamType);
            handleClearState();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
