import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch } from "src/store";
import { setAwayData, setHomeData } from "src/slices/match";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({ teamType, players }) {
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(players);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (player) => () => {
    const currentIndex = checked.indexOf(player);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(player);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (players) => intersection(checked, players).length;

  const handleToggleAll = (players) => () => {
    if (numberOfChecked(players) === players.length) {
      setChecked(not(checked, players));
    } else {
      setChecked(union(checked, players));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  React.useEffect(() => {
    if (teamType == "home") dispatch(setHomeData({ startingEleven: right }));
    else dispatch(setAwayData({ startingEleven: right }));
  }, [dispatch, teamType, right]);

  const customList = (title, players) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 2 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(players)}
            checked={numberOfChecked(players) === players.length && players.length !== 0}
            indeterminate={
              numberOfChecked(players) !== players.length && numberOfChecked(players) !== 0
            }
            disabled={players.length === 0}
            inputProps={{
              "aria-label": "all players selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(players)}/${players.length} players selected`}
      />
      <Divider />
      <List
        sx={{
          width: 290,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {players.map((player) => {
          const { id, name, jerseyNumber, position } = player;
          const labelId = `transfer-list-all-item-${id}-label`;

          return (
            <ListItem key={id} role="listitem" button onClick={handleToggle(player)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(player) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`#${jerseyNumber} ${name}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList("Substitutes", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Active Players", right)}</Grid>
    </Grid>
  );
}
