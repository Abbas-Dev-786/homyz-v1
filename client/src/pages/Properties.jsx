import { useMemo } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import Searchbar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../api";

const Properties = () => {
  const { data, fetchNextPage } = useInfiniteQuery(
    ["properties"],
    ({ pageParam = 1 }) => getProperties(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.data.hasNextPage
          ? allPages.length + 1
          : undefined;

        return nextPage;
      },
      select: (obj) => {
        const data = obj.pages.flatMap((el) => el.data.docs);
        const totalDocs = obj.pages[0].data.totalDocs;

        return { data, totalDocs };
      },
    }
  );

  const propertiesData = useMemo(() => data?.data, [data]);

  if (!data || !propertiesData?.length)
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
        dataLength={propertiesData.length}
        next={fetchNextPage}
        hasMore={data.totalDocs !== propertiesData.length}
        scrollableTarget="scrollableDiv"
        loader={
          <Box height={50} mb={5} display="flex" justifyContent="center">
            <CircularProgress color="warning" />
          </Box>
        }
        endMessage={
          <Typography variant="body1" color="orange" textAlign="center" mb={5}>
            <b>Yay! You have seen it all</b>
          </Typography>
        }
      >
        <Grid container spacing={3} mt={3}>
          {propertiesData.map((el) => (
            <Grid key={el._id} item xs={12} sm={6} md={4} xl={3}>
              <PropertyCard {...el} img={el.images[0]} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default Properties;
