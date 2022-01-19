import AsyncResource from "../AsyncResource";
import axios from 'axios';

export const dashboardResource = new AsyncResource(
  axios.get('http://localhost:3100/buckbeak/dashboard').then((response) => response.data)
);

export const meetingListResource = () => {
  return new AsyncResource(
    axios.get(`http://localhost:3100/my/meetings?inTrash=false`).then((response) => response.data)
  )
};

export const trashMeetingListResource = () => {
  return new AsyncResource(
    axios.get(`http://localhost:3100/my/meetings?inTrash=true`).then((response) => response.data)
)};

export const meetingNoteResource = () => {
  return new AsyncResource(axios.get('http://localhost:3100/meeting/9jjj').then((response) => response.data ));
};