import React from 'react';
import Menu from "../Layouts/Menu";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";

export default function Homepage() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Menu/>
      <div className={classes.homeContainer}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.mainFeaturedPost}>
              <div className={classes.overlay}/>
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                      BOOKING.ww
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      As one of the world's largest travel marketplaces for both established brands and entrepreneurs of
                      all sizes,
                      Booking.ww enables properties around the world to reach a global audience and grow their
                      businesses.
                    </Typography>
                    <Link variant="subtitle1" href="#">
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

