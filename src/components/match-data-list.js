import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MatchDataList = ({
  title,
  records,
  teamType = null,
  handleDeleteData = null,
  hasDeleteButton = false,
}) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {records.length > 0 ? (
        records.map((record, index) => {
          if (title == "Goals") var { id, name, jerseyNumber } = record.scorer;
          else if (title == "Assists") var { id, name, jerseyNumber } = record.assister;
          else var { id, name, jerseyNumber } = record.receiver;

          return (
            <ListItem
              key={id + index.toString()}
              secondaryAction={
                hasDeleteButton ? (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteData(teamType, record)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
            >
              <ListItemAvatar>
                <Avatar>{jerseyNumber}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={record.time} />
            </ListItem>
          );
        })
      ) : (
        <Typography variant="body1" sx={{ px: 2 }}>
          No records
        </Typography>
      )}
    </List>
  );
};

export default MatchDataList;
