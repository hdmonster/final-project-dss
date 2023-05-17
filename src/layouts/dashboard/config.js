import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import BuildingOffice from "@heroicons/react/24/solid/BuildingOfficeIcon";
import ClipboardDocumentIcon from "@heroicons/react/24/solid/ClipboardDocumentIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Matches",
    path: "/matches",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Clubs",
    path: "/clubs",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice />
      </SvgIcon>
    ),
  },
];
