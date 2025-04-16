import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Container
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_MENU_BY_CATEGORY } from "../../utils/queries";

function Edibles() {
  const { loading, error, data } = useQuery(GET_MENU_BY_CATEGORY, {
    variables: { category: "Edibles" }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading edibles.</p>;

  const items = data?.menuByCategory || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edibles
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <Grid container spacing={3} sx={{ flexWrap: "nowrap" }}>
          {items.map((item) => (
            <Grid item key={item._id} sx={{ minWidth: 270, maxWidth: 270 }}>
              <Paper sx={{ p: 2, borderRadius: 3, height: "100%", opacity: 0.85 }}>
                <Typography variant="h6" align="center">
                  {item.name}
                </Typography>
                <Typography variant="subtitle2" align="center" sx={{ mb: 1 }}>
                  {item.strain}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2 }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      maxHeight: 100,
                      overflow: "hidden"
                    }}
                  >
                    {item.effect &&
                      item.effect.map((eff, idx) => (
                        <Typography key={idx} variant="body2" noWrap sx={{ fontSize: 12 }}>
                          {eff}
                        </Typography>
                      ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3 }}>
                  {item.price.map((tier, idx) => (
                    <Typography key={idx} variant="body2" sx={{ width: "33%" }}>
                      <strong>{tier.quantity}</strong> : ${tier.amount}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Edibles;
