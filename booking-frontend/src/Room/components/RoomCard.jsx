import React from 'react'
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { Paper, Typography } from "@material-ui/core";
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { apiUrl } from "../../_services/config";

export default function RoomCard(props) {
  const image = props.images[0]?.imagePath;

  return (
      <Card>
        <CardHeader title={props.address} subheader={props.city?.name}/>
        {image ? (
            <CardMedia
                image={`${apiUrl}/${image}`}
                style={{height: '200px'}}
            />
        ) : (
            <div style={{height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <PhotoCameraOutlinedIcon fontSize="large"/>
              <Typography variant="body1">No photo provided</Typography>
            </div>
        )}
        <CardContent>
        </CardContent>
        <CardActions>
          <Button href={`/rooms/${props.id}`} size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
  )
}

// Guests amount
// StartDate, EndDate, Date
