import PropTypes from "prop-types";
import {
  IconButton,
  Checkbox,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";

const PropertyCard = ({ img, price, title, description }) => {
  const { palette } = useTheme();

  return (
    <Link to="/properties/374837874">
      <Card sx={{ mt: 1, mb: 5, mx: 1, boxShadow: "none", cursor: "pointer" }}>
        <div className="card-top">
          <img src={img} width="100%" alt={title} />
          <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <Checkbox
              aria-label="like-icon"
              icon={<FavoriteBorder sx={{ color: "white" }} />}
              checkedIcon={<Favorite sx={{ color: "white" }} />}
            />
          </IconButton>
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.secondary"
          >
            ${price}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            color={palette.my.main}
            noWrap
          >
            {htmlToText(title)}
          </Typography>
          <Typography variant="body1" color="GrayText" noWrap>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

PropertyCard.propTypes = {
  img: PropTypes.string,
  price: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default PropertyCard;
