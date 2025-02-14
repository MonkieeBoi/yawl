import { useState } from "react";
import { Container, Grid2, Box, Avatar, Typography } from "@mui/material";
import Wishlist from "../assets/Wishlist.jsx"

export default function Profile() {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Avatar sx={{ width: 100, height: 100, margin: "auto" }} src="imgs/profile-photo.png" />
        <Typography variant="h5" mt={2}>User Name</Typography>
        <Typography variant="body2" color="text.secondary">Use Descriptions</Typography>
      </Box>
      <Grid2 container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid2 item xs={12} sm={6} md={4} key={item}>
            <Wishlist></Wishlist>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

