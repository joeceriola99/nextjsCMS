import React from "react";
import { Typography, Button, useMediaQuery } from "@material-ui/core";
export default function Item({ item }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div style={{ position: "relative", top: 0, left: 0 }}>
      <img
        src={item.image}
        alt={"Carousel Item"}
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "60vh",
          maxHeight: "100vh",
          objectFit: "cover",
        }}
        draggable={false}
      />
      <div
        style={{
          position: "absolute",
          padding: 5,
          top: "20%",
          left: isMobile ? "5%" : "25%",
          display: "flex",
          alignContent: "center",
          justifyItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <Typography
          variant="h5"
          style={{
            color: "white",
          }}
        >
          AJ Sliders
        </Typography> */}
        <Typography variant="h2" style={{ color: "white", fontWeight: 800 }}>
          {item.heading}
        </Typography>
        <Typography variant="h4" style={{ color: "white" }} gutterBottom>
          {item.subHeading}
        </Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: "0px", padding: "9px 2rem" }}
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}
