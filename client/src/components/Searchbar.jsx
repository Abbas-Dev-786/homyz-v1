import {
  Autocomplete,
  Box,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useQuery } from "react-query";
import { getCities } from "../api";

function Searchbar() {
  const { data } = useQuery(["cities"], getCities);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      bgcolor="white"
      component="form"
      width={{ xs: "80vw", sm: 400 }}
      display="flex"
      alignItems="center"
      gap={1}
      justifyContent="space-between"
      mt={3}
      px={2}
      py={1}
      borderRadius={1}
      onSubmit={handleSearch}
    >
      <Autocomplete
        disablePortal={true}
        id="search-bar"
        options={data || []}
        freeSolo
        sx={{
          background: "transparent",
        }}
        fullWidth
        size="small"
        autoHighlight={true}
        getOptionLabel={(options) => options._id}
        renderInput={(params) => (
          <TextField
            label="Search for places"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon color="primary" />
                </InputAdornment>
              ),
            }}
            {...params}
          />
        )}
      />

      <Button variant="contained" size="small" type="submit">
        Search
      </Button>
    </Box>
  );
}

export default Searchbar;
