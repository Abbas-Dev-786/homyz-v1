import { Typography, Box, Button, useTheme } from "@mui/material";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PlaceIcon from "@mui/icons-material/Place";
import FlexBetween from "./FlexBetween";

const PropertyDetail = () => {
  const { palette } = useTheme();

  return (
    <Box p={1}>
      <FlexBetween>
        <Typography variant="h5" fontWeight={700} color={palette.my.main}>
          Properrty Name
        </Typography>
        <Typography variant="h5" fontWeight={600} color={palette.my.sub}>
          $5000
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
            2 Bathrooms
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
          <Typography variant="body2">2 Rooms</Typography>
        </Box>
      </Box>

      <Typography variant="body1" color="GrayText" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquam
        ratione aliquid rem iusto, suscipit laborum sequi aut cum ab, facilis
        sunt, odit nihil sint eaque commodi laudantium dolor voluptates neque
        totam. Repellendus quis, voluptate temporibus a corporis qui soluta
        necessitatibus, obcaecati culpa veniam placeat neque. Totam, sed? Dicta,
        unde ut cum ex ipsam, eius vitae accusamus minima fugiat explicabo,
        ipsum corrupti doloribus officia facere facilis enim! Sed unde
        consequatur mollitia itaque ratione sit voluptates, nobis dolore
        perferendis, aspernatur tempora iusto earum! Non officia eum facilis
        consequuntur, temporibus doloremque, maiores libero vero sint tempora
        assumenda, quam doloribus nobis rerum quaerat?
      </Typography>

      <Typography display="flex" alignItems="flex-end" gap={1} my={3}>
        <PlaceIcon />
        Indore
      </Typography>

      <Box display="flex" alignItems="center" gap={5}>
        <Button variant="contained" color="warning">
          Book Your Visit
        </Button>

        <Button variant="outlined" color="warning">
          Bid On this project
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyDetail;
