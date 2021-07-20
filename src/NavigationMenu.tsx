import Drawer from "@material-ui/core/Drawer";
import { useCallback, useMemo, useState } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import { HelpOutlineRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

import { ListItemLink } from "./ListItemLink";

type TNavigationMenuState = {
  isOpen: boolean;
  open: () => unknown;
  close: () => unknown;
};

const useStyles = makeStyles((theme) => ({
  bottomList: { marginTop: "auto" },
}));

export function NavigationMenu({
  navigationMenuState,
}: {
  navigationMenuState: TNavigationMenuState;
}) {
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      open={navigationMenuState.isOpen}
      onClose={navigationMenuState.close}
    >
      <List>
        <ListItemLink button to="/demo" onClick={navigationMenuState.close}>
          <ListItemIcon>
            <HelpOutlineRounded />
          </ListItemIcon>
          <ListItemText primary="Demo" />
        </ListItemLink>
      </List>
      <List className={classes.bottomList}>
        <Divider />
        <ListItemLink button to="/demo" onClick={navigationMenuState.close}>
          <ListItemIcon>
            <HelpOutlineRounded />
          </ListItemIcon>
          <ListItemText primary="Demo" />
        </ListItemLink>
      </List>
    </Drawer>
  );
}

export function useNavigationMenuState(): TNavigationMenuState {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return useMemo(() => ({ isOpen, open, close }), [close, isOpen, open]);
}
