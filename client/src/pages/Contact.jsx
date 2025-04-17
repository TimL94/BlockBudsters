import { Container, Typography, Link, Divider, Box } from "@mui/material";
import React from "react";

function Contact() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Divider sx={{ my: 3, borderColor: "white" }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1">
          <strong>Phone:</strong>{" "}
          <Link
            href="tel:2078508567"
            sx={{ color: "white", textDecoration: "underline" }}
          >
            (207) 850-8567
          </Link>
        </Typography>

        <Typography variant="body1">
          <strong>Email:</strong>{" "}
          <Link
            href="mailto:Blockbudsters@gmail.com"
            sx={{ color: "white", textDecoration: "underline" }}
          >
            BlockBudsters@gmail.com
          </Link>
        </Typography>

        <Typography variant="body1">
          <strong>Address:</strong>{" "}
          <Link
            href="https://www.google.com/maps/search/?api=1&query=178+Creamery+Hill+Rd,+Lebanon,+ME,+04027"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", textDecoration: "underline" }}
          >
            178 Creamery Hill Rd, Lebanon, ME 04027
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Contact;
