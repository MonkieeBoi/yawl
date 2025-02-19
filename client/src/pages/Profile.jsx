import { useEffect, useState } from "react";
import { Container, Grid2, Box, Avatar, Typography, Pagination } from "@mui/material";
import Wishlist from "../assets/Wishlist.jsx";

export default function Profile() {
  const [wishlistIds, setWishlistIds] = useState([0]);
  const [username, setUsername] = useState("Guest User");
  const [page, setPage] = useState(1);

  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWishlistIds = wishlistIds.slice(startIndex, endIndex);

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  
  const getWishlistsIds = async () => {
    try {
      const logInResponse = await fetch("/api/users/isLoggedIn", {
        method: "GET",
        credentials: "include",
      });
      const logInData = await logInResponse.json();
      if (logInData.loggedIn) {
        try {
          setUsername(logInData.user.username);
          const wishListIdResponse = await fetch(`/api/wishlist/${logInData.user.username}/wishlists`);
          const wishListIdData = await wishListIdResponse.json();
          if (wishListIdData.success === true && wishListIdData.data.length > 0) {
            setWishlistIds(wishListIdData.data); 
          } else {
            setWishlistIds([1, 2, 3, 4,5]); 
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlistsIds();
  }, []);



  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Avatar sx={{ width: 100, height: 100, margin: "auto" }} src="imgs/profile-photo.png" />
        <Typography variant="h5" mt={2}>{username}</Typography>
        <Typography variant="body2" color="text.secondary">Wishlists</Typography>
      </Box>

      <Grid2 container spacing={3}>
        {currentWishlistIds.map((id) => (
          <Grid2 item xs={12} sm={6} md={4} key={id}>
            <Wishlist wishlistId={id} />
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(wishlistIds.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}
