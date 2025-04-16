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

function PreRolls() {
  const { loading, error, data, refetch } = useQuery(GET_MENU_BY_CATEGORY, {
    variables: { category: "Pre Rolls" }
  });

  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item?");
    if (!confirmed) return;

    try {
      await deleteMenuItem({
        variables: { menuItemId: id }
      });
      refetch();
    } catch (err) {
      console.error("Failed to delete menu item:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading pre-rolls.</p>;

  const items = data?.menuByCategory || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pre Rolls
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
              <Paper sx={{ p: 2, borderRadius: 3, height: "100%", opacity: 0.85, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
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
                          <Typography key={idx} variant="body2" noWrap sx={{ fontSize: 12, mr: 1 }}>
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

export default PreRolls;
