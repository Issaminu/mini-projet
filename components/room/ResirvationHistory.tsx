'useClient';
import { Fragment, useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Floor, RoomType, Room } from '@prisma/client';
interface roomType extends Room {
  type: RoomType;
}

const ResirvationHistory = (props: { roomId: Number }) => {
  useEffect(() => {
    axios
      .get(`/api/manager/room/${props.roomId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <Fragment>Hello My niggas</Fragment>;
};
export default ResirvationHistory;
