import { ComponentProps } from "react";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useListItemLinkStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export function ListItemLink({
  to,
  ...otherProps
}: ComponentProps<typeof ListItem> & ComponentProps<typeof Link>) {
  const classes = useListItemLinkStyles();

  return (
    <ListItem
      component={Link}
      className={classes.root}
      to={to}
      {...otherProps}
    />
  );
}
