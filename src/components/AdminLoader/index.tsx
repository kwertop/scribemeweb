import { LoaderContainer } from "./styles";
import CircularProgress from '@mui/material/CircularProgress';

const AdminLoader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default AdminLoader;
