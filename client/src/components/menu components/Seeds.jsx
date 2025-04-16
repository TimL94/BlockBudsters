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

function Seeds() {
  const { loading, error, data } = useQuery(GET_MENU_BY_CATEGORY, {
    variables: { category: "Seeds" }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Seedss.</p>;

  const items = data?.menuByCategory || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Seeds
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <Grid container spacing={3} sx={{ flexWrap: "nowrap" }}>
          {items.map((item) => (
            <Grid item key={item._id} sx={{ minWidth: 300, maxWidth: 300 }}>
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

                <Box sx={{ display: "flex", gap: 2 }}>
                  {(() => {
                    const columns = [];
                    const itemsPerColumn = 5;
                    const effects = item.effect || [];

                    for (let i = 0; i < effects.length; i += itemsPerColumn) {
                      const columnItems = effects.slice(i, i + itemsPerColumn);
                      columns.push(
                        <Box key={i} sx={{ display: "flex", flexDirection: "column" }}>
                          {columnItems.map((eff, idx) => (
                            <Typography
                              key={idx}
                              variant="body2"
                              noWrap
                              sx={{ fontSize: 12 }}
                            >
                              {eff}
                            </Typography>
                          ))}
                        </Box>
                      );
                    }

                    return columns;
                  })()}
                </Box>
              </Box>

          
              <Divider sx={{ my: 1 }} />
          
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {item.price.map((tier, idx) => (
                  <Box
                    key={idx}
                    sx={{ width: "30%", display: "flex", gap: 0.5, fontSize: 14 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {tier.quantity} :
                    </Typography>
                    <Typography variant="body2">${tier.amount}</Typography>
                  </Box>
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

export default Seeds;
