import React, { useState } from "react";
import { Dialog, Grid } from "@material-ui/core";

export default function Gallery({ gallery = [] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Grid container>
      {gallery.map((pic) => {
        return (
          <Grid
            key={pic.image}
            item
            xs={12}
            sm={6}
            style={{ padding: "6px", cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(pic)}
            onClick={() => {
              setIsHovered(pic.image);
              setOpen(true);
            }}
          >
            <img
              src={pic.image}
              style={{
                width: "100%",
                filter: isHovered === pic.image && "brightness(0.5)",
              }}
            />
          </Grid>
        );
      })}
      <PhotoViewer open={open} setOpen={setOpen} pic={isHovered} />
    </Grid>
  );
}

export const PhotoViewer = ({ open, setOpen, pic }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <img src={pic} style={{ width: "100%" }} alt="Aj sliders gallery" />
    </Dialog>
  );
};
