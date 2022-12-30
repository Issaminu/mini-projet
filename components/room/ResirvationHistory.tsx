'useClient';
import { Fragment, useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Floor, RoomType, Room } from '@prisma/client';
interface roomType extends Room {
  type: RoomType;
}

const singleRoom = (props: any) => {
  return <Fragment>Hello My niggas</Fragment>;
};
export default singleRoom;
