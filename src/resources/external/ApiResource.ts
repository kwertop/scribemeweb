import AsyncResource from "../AsyncResource";
import axios from 'axios';

import { API_ENDPOINT } from '../../constants';

export const dashboardResource = new AsyncResource(
  axios.get(`${API_ENDPOINT}/buckbeak/dashboard`).then((response) => response.data)
);

export const meetingListResource = () => {
  return new AsyncResource(
    axios.get(`${API_ENDPOINT}/my/meetings?inTrash=false`).then((response) => response.data)
  )
};

export const trashMeetingListResource = () => {
  return new AsyncResource(
    axios.get(`${API_ENDPOINT}/my/meetings?inTrash=true`).then((response) => response.data)
)};

export const meetingNoteResource = (code: string) => {
  return new AsyncResource(axios.get(`${API_ENDPOINT}/meeting/${code}`).then((response) => response.data ));
};

export const searchResource = (query: string) => {
  return new AsyncResource(axios.get(`${API_ENDPOINT}/meetings/search?query=${query}&all=true`).then((response) => response.data ));
};