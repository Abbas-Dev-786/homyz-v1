import PropTypes from "prop-types";
import { Typography, Box, Button, useTheme } from "@mui/material";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PlaceIcon from "@mui/icons-material/Place";
import FlexBetween from "./FlexBetween";
import { htmlToText } from "html-to-text";
import useAuth from "../hooks/useAuth";

const PropertyDetail = ({
  title,
  price,
  noOfBathrooms,
  noOfBedrooms,
  description,
  city,
}) => {
  const { user } = useAuth();
  const { palette } = useTheme();

  const sanitizedDescription = htmlToText(description);

  const handleView = () => {};
  const handleBid = () => {};

  return (
    <Box p={1}>
      <FlexBetween>
        <Typography variant="h5" fontWeight={700} color={palette.my.main}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={600} color={palette.my.sub}>
          ${price}
        </Typography>
      </FlexBetween>

      <Box display="flex" alignItems="center" gap={3} my={3} flexWrap="wrap">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <BathtubIcon color="info" />
          <Typography variant="body2" fontWeight={500}>
            {noOfBathrooms} Bathrooms
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <DirectionsCarIcon color="info" />
          <Typography variant="body2">1 Parkings</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <MeetingRoomIcon color="info" />
          <Typography variant="body2">{noOfBedrooms} Rooms</Typography>
        </Box>
      </Box>

      <Typography variant="body1" color="GrayText" gutterBottom>
        {sanitizedDescription}
      </Typography>

      <Typography display="flex" alignItems="flex-end" gap={1} my={3}>
        <PlaceIcon />
        {city}
      </Typography>

      <Box display="flex" alignItems="center" gap={5}>
        <Button
          variant="contained"
          color="warning"
          disabled={!user}
          onClick={handleView}
        >
          Book Your Visit
        </Button>

        <Button
          variant="outlined"
          color="warning"
          disabled={!user}
          onClick={handleBid}
        >
          Bid On this project
        </Button>
      </Box>

      {!user && (
        <Typography mt={2} color="red" variant="caption">
          Please Login to access this feature
        </Typography>
      )}
    </Box>
  );
};

PropertyDetail.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  noOfBathrooms: PropTypes.number,
  noOfBedrooms: PropTypes.number,
  description: PropTypes.string,
  city: PropTypes.string,
};

export default PropertyDetail;
