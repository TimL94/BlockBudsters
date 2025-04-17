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
import { useQuery } from "@apollo/client";
import { GET_MENU_BY_CATEGORY } from "../../utils/queries";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_MENU_ITEM } from "../../utils/mutations";

function Specials() {
  const { loading, error, data, refetch } = useQuery(GET_MENU_BY_CATEGORY, {
    variables: { category: "Special" },
  });

  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading specials.</p>;

  const items = data?.menuByCategory || [];

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item?");
    if (!confirmed) return;

    try {
      await deleteMenuItem({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Specials
      </Typography>
      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <Grid
          container
          spacing={3}
          wrap="nowrap"
          sx={{ flexWrap: "nowrap", display: "flex" }}
        >
          {items.map((item) => (
            <Grid
              item
              key={item._id}
              sx={{
                minWidth: 300,
                maxWidth: 300,
                flex: "0 0 auto",
              }}
            >
              <Paper sx={{ p: 2, borderRadius: 3, height: "100%", opacity: 0.85 }}>
                <Typography variant="h6" align="center">
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ mb: 1, fontStyle: "italic" }}
                >
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

                {Auth.loggedIn() && Auth.isAdmin() && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item._id)}
                    sx={{ mt: 2 }}
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

export default Specials;
