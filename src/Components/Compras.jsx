import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Page } from ".";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const Compras = () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.root}>Compras</div>
    </Page>
  );
};
