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

export default function AddCardsForm({ open, handleClose, handleSaveAndClose, players, teamType }) {
  const [card, setCard] = React.useState({
    receiver: {},
    time: 0,
  });

  const handleClearState = () => {
    setCard({ receiver: {}, time: 0 });
  };

  const handleChange = (event, val) => {
    if (event.target.name == "time") setCard({ ...card, [event.target.name]: val });
    else setCard({ ...card, [event.target.name]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add card and assist record</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText> */}

        <DefaultSelect
          name="receiver"
          label="Receiver"
          options={players}
          state={card.receiver}
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
          <Typography variant="caption">Received at minute {card.time}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSaveAndClose(card, teamType);
            handleClearState();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
