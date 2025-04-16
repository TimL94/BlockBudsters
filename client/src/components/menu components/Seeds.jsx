import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Container,
  Button
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MENU_BY_CATEGORY } from "../../utils/queries";
import { DELETE_MENU_ITEM } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Seeds() {
  const { loading, error, data, refetch } = useQuery(GET_MENU_BY_CATEGORY, {
    variables: { category: "Seeds" }
  });

  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this menu item?");
    if (!confirmed) return;
    try {
      await deleteMenuItem({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Seeds.</p>;

  const items = data?.menuByCategory || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Seeds
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{ flexWrap: "nowrap" }}
              >
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
                                sx={{ fontSize: 12, mr: 1 }}
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

                {Auth.isAdmin() && (
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Remove
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Seeds;
