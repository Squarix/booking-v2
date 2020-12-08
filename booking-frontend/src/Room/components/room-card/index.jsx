import React from 'react'

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import { Tooltip, Typography } from "@material-ui/core";

import { apiUrl } from "../../../_services/config";

import './index.css';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ApartmentIcon from '@material-ui/icons/Apartment';
import GroupIcon from '@material-ui/icons/Group';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

export default function Index(props) {
  const getTooltipTitle = title => (
    <span className="room-card__tooltip">{title}</span>
  );

  return (
    <a href={`/rooms/${props.id}`}>
      <Card style={{ maxWidth: '300px'}}>
        <CardHeader title={props.address} subheader={props.city?.name}/>
        {props.image ? (
          <CardMedia
            image={`${apiUrl}/${props.image.path}`}
            style={{ height: '200px' }}
          />
        ) : (
          <div style={{
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <PhotoCameraOutlinedIcon fontSize="large"/>
            <Typography variant="body1">No photo provided</Typography>
          </div>
        )}
        <CardContent>
        </CardContent>
        <CardActions>
          <div className="room-card__action-container">
            <Tooltip title={getTooltipTitle('Price')}>
              <div className="room-card__action-item">
                <AttachMoneyIcon/> <span>{props.price}</span>
              </div>
            </Tooltip>
            <Tooltip title={getTooltipTitle('Guests amount')}>
              <div className="room-card__action-item">
                <GroupIcon/> <span>{props.guestsAmount}</span>
              </div>
            </Tooltip>
            <Tooltip title={getTooltipTitle('Address')}>
              <div className="room-card__action-item">
                <LocationOnIcon/> <span>{props.address}</span>
              </div>
            </Tooltip>
            <Tooltip title={getTooltipTitle('Rooms amount')}>
              <div className="room-card__action-item">
                <ApartmentIcon/> <span>{props.size}</span>
              </div>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    </a>
  )
}

// Guests amount
// StartDate, EndDate, Date
