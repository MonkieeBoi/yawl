import { useEffect, useState } from "react";
import { Container, Grid2, Box, Avatar, Typography } from "@mui/material";
import Wishlist from "../assets/Wishlist.jsx"

export default function Profile() {

  const [wishlistIds, setWishlistIds] = useState([]);
  const [currentWishlistIds, setCurrentWishlistIds] = useState([]);
  const getWishlistsIds = async () => {
    try {
      const logInResponse = await fetch("/api/users/isLoggedIn", {
        method: "GET",
        credentials: "include",
      });
      const logInData = await logInResponse.json();
      if (logInData.loggedIn) {
        try {
          const username = logInData.user.username;
          const wishListIdResponse = await fetch(`/api/wishlist/${username}/wishlists`);
          setWishlistIds(wishListIdResponse.data);
          setCurrentWishlistIds(wishlistIds.slice(0, 3)); // keep 3 wishlists in the current rotation
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getWishlistsIds();

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Avatar sx={{ width: 100, height: 100, margin: "auto" }} src="imgs/profile-photo.png" />
        <Typography variant="h5" mt={2}>User Name</Typography>
        <Typography variant="body2" color="text.secondary">Use Descriptions</Typography>
      </Box>
      <Grid2 container spacing={3}>
        {currentWishlistIds.map((id) => (
          <Grid2 item xs={4} sm={4} md={4} key={id}>
            <Wishlist wishlistId={id} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

