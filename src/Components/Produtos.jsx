import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const Produtos = () => {
  const classes = useStyles();
  return <div className={classes.root}>Produtos</div>;
};