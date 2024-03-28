import * as React from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Paper } from "@mui/material";

export default function Profile() {
  return (
    <Box sx={{ pt: 5 }}>
      <Card sx={{ height: 315, maxWidth: 800, margin: "auto", position: "relative" }}>
        <CardMedia
          sx={{ height: 200, bgcolor: "gray" }}
          image={''}
          title="background"
        />
        <Paper sx={{ height: 120, position: "relative", position: "relative", top: -5 }}>
          <Avatar
            alt="User avatar"
            src="https://kartinki.pics/uploads/posts/2022-03/thumbs/1648048112_5-kartinkin-net-p-kartinki-litsa-cheloveka-5.jpg"
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              top: -50,
              left: 20,
              border: 4,
              borderColor: "white",
            }}
          />
          <CardContent sx={{ maxWidth: 600, margin: "auto" }}>
            <Typography gutterBottom variant="h5" component="div">
              Name LastName
            </Typography>
            <CardActions sx={{ justifyContent: "end" }}>
              <Button variant="Text" size="small">
                Edit profile
              </Button>
              <Button variant="Text" size="small">
                More
              </Button>
            </CardActions>
          </CardContent>
        </Paper>
      </Card>
    </Box>
  );
}
