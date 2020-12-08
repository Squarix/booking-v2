import React from 'react';

import './index.css'
import ApartmentIcon from "@material-ui/icons/Apartment";
import { Tooltip } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupIcon from "@material-ui/icons/Group";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { apiUrl } from "../../../_services/config";
import NoPhotoPlaceholder from "../no-photo";

export default function RoomRow(props) {
  const getTooltipTitle = title => (
    <span className="room-row__tooltip">{title}</span>
  );

  return (
    <a href={`/rooms/${props.id}`} className="room-row__container">
      <div className="room-row__image-container">
        {props.image?.path ? (
          <img className="room-row__image" src={`${apiUrl}/${props.image?.path}`} />
        ) : (
          <NoPhotoPlaceholder className="room-row__image" />
        )}
      </div>
      <div className="room-row__data">
        <div className="room-row__data-top">
          <div className="room-row__header">
            Appartments at
            {props.city?.name}
          </div>
          <div className="room-row__description">{props.description}</div>
          <div className="room-row__delimiter" />
          <div className="room-row__action-container">
            <Tooltip title={getTooltipTitle('Guests amount')}>
              <div className="room-row__action-item">
                <GroupIcon fontSize="12px" /> 
                {' '}
                <span>{props.guestsAmount}</span>
              </div>
            </Tooltip>
            <Tooltip title={getTooltipTitle('Address')}>
              <div className="room-row__action-item">
                <LocationOnIcon fontSize="12px" /> 
                {' '}
                <span>{props.address}</span>
              </div>
            </Tooltip>
            <Tooltip title={getTooltipTitle('Rooms amount')}>
              <div className="room-row__action-item">
                <ApartmentIcon fontSize="12px" /> 
                {' '}
                <span>{props.size}</span>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="room-row__data-bottom">
          <div className="room-row__price">
            <b>
              {props.price}
              {' '}
              $
            </b>
            {' '}
            / per day
          </div>
        </div>
      </div>
    </a>
  );
}
