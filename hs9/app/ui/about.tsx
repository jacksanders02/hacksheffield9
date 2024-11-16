"use client";

import React, { useState } from "react";
import { Tooltip, IconButton, Modal, Box, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function About() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <IconButton
            onClick={handleOpen}
            style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            }}
        >
            <HelpOutlineIcon />
        </IconButton>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            What is Growth?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            PLACEHOLDER
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
