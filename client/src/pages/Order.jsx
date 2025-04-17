import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  MenuItem,
  TextField,
  Button,
  Box,
  Divider
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_MENU_BY_CATEGORY } from "../utils/queries";

const categories = [
  "Flower",
  "Pre Rolls",
  "Concentrates",
  "Edibles",
  "Limited",
  "Special",
  "Seeds"
];

function Order() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [orderSummary, setOrderSummary] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const { data, refetch } = useQuery(GET_MENU_BY_CATEGORY, {
    variables: { category: selectedCategory },
    skip: !selectedCategory
  });

  const menuItems = data?.menuByCategory || [];
  const selectedItem = menuItems.find((item) => item._id === selectedItemId);
  const selectedPrice = selectedItem?.price.find((p) => p.quantity === selectedTier);

  const handleAddToOrder = () => {
    if (!selectedItem || !selectedTier || !itemQuantity) return;

    setOrderSummary((prev) => [
      ...prev,
      {
        item: selectedItem.name,
        tier: selectedTier,
        quantity: itemQuantity,
        amount: selectedPrice.amount
      }
    ]);

    setSelectedItemId("");
    setSelectedTier("");
    setItemQuantity(1);
  };

  const handleSubmitOrder = async () => {
    const total = orderSummary.reduce(
      (sum, item) => sum + item.amount * item.quantity,
      0
    );

    const message = `
New Order from ${customerName}
Phone: ${customerPhone}

Items:
${orderSummary
  .map(
    (item) =>
      `${item.quantity}x ${item.item} (${item.tier}) - $${item.amount * item.quantity}`
  )
  .join("\n")}

Total: $${total.toFixed(2)}
    `;

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

    try {
      const response = await fetch(`${apiUrl}/api/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: "New Order from BlockBudsters",
          text: message
        })
      });

      if (!response.ok) {
        throw new Error("Email send failed");
      }

      const result = await response.json();
      console.log("Email sent:", result);
      alert("Order placed successfully!");

      // Reset form
      setSelectedCategory("");
      setSelectedItemId("");
      setSelectedTier("");
      setItemQuantity(1);
      setOrderSummary([]);
      setCustomerName("");
      setCustomerPhone("");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send order. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      refetch();
      setSelectedItemId("");
      setSelectedTier("");
    }
  }, [selectedCategory, refetch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, opacity: 0.85 }}>
        <Typography variant="h4" gutterBottom>
          Place Your Order
        </Typography>

        <TextField
          select
          fullWidth
          label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        {selectedCategory && (
          <>
            <TextField
              select
              fullWidth
              label="Menu Item"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              sx={{ mb: 2 }}
            >
              {menuItems.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            {selectedItem && (
              <>
                <TextField
                  select
                  fullWidth
                  label="Quantity Tier"
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  {selectedItem.price.map((p, idx) => (
                    <MenuItem key={idx} value={p.quantity}>
                      {p.quantity} - ${p.amount}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="number"
                  fullWidth
                  label="How many?"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddToOrder}
                  sx={{ mb: 2 }}
                >
                  Add to Order
                </Button>
              </>
            )}
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Order Summary
        </Typography>
        {orderSummary.length === 0 ? (
          <Typography>No items added yet.</Typography>
        ) : (
          <Box>
            {orderSummary.map((item, idx) => (
              <Typography key={idx}>
                {item.quantity}x {item.item} ({item.tier}) - ${item.amount * item.quantity}
              </Typography>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Total: ${orderSummary.reduce((sum, item) => sum + item.amount * item.quantity, 0).toFixed(2)}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <TextField
          fullWidth
          label="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmitOrder}
          disabled={
            !customerName || !customerPhone || orderSummary.length === 0
          }
        >
          Submit Order
        </Button>
      </Paper>
    </Container>
  );
}

export default Order;
