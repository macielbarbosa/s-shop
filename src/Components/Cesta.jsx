import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const Cesta = () => {
  const classes = useStyles();
  return <div className={classes.root}>Cesta</div>;
};
