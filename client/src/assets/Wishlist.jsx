import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PropTypes from 'prop-types';

export default function WishList({ wishListId }) {
  console.log(wishListId)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-a-close-up-of-a-blue-ocean-with-waves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="default image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            WISHLIST_NAME
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            info: items: total price: other stats:
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

WishList.propTypes = {
  wishListId: PropTypes.string.isRequired,
};
