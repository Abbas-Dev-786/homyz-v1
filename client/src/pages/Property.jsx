import { Container, Grid } from "@mui/material";
import Carousel from "../components/Carousel";
import PropertyDetail from "../components/PropertyDetail";
import MapBox from "../components/MapBox";

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  coords: {
    lat: 37.42216,
    lng: -122.08427,
  },
};

const Property = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }} disableGutters>
      <Carousel />
      <Grid container my={3} spacing={5}>
        <Grid item xs={12} md={6}>
          <PropertyDetail />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapBox location={location} zoomLevel={13} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Property;
