import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Searchbar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import { useEffect, useState } from "react";

const Properties = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData((prev) => [...prev, ...json]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data.length)
    return (
      <Box
        height="75vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="warning" size={70} />
      </Box>
    );

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center">
        <Searchbar />
      </Box>
      <InfiniteScroll
        dataLength={100}
        next={fetchData}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        loader={
          <Box height={50} mb={5} display="flex" justifyContent="center">
            <CircularProgress color="warning" />
          </Box>
        }
        endMessage={
          <Typography variant="body2" textAlign="center">
            <b>Yay! You have seen it all</b>
          </Typography>
        }
      >
        <Grid container spacing={3} mt={3}>
          {data.map((el, i) => (
            <Grid key={el.id + i} item xs={12} sm={6} md={4} xl={3}>
              <PropertyCard {...el} img={el.image} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default Properties;
