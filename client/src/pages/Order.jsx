import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  MenuItem,
  TextField,
  Button,
  Box,
  Divider,
  IconButton
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_MENU_BY_CATEGORY } from "../utils/queries";
import CloseIcon from "@mui/icons-material/Close";
import Auth from "../utils/auth";

const categories = [
  "Flower",
  "Pre Rolls",
  "Concentrates",
  "Edibles",
  "Limited",
  "Special",
  "Seeds"
];

const fieldSx = {
  mb: 2,
  "& label.Mui-focused": { color: "#006400" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#006400" },
    "&:hover fieldset": { borderColor: "#004d00" },
    "&.Mui-focused fieldset": { borderColor: "#006400" }
  }
};

function Order() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [orderSummary, setOrderSummary] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

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
        amount: selectedPrice.amount,
        category: selectedCategory
      }
    ]);
    setSelectedItemId("");
    setSelectedTier("");
    setItemQuantity(1);
  };

  const handleRemoveItem = (index) => {
    setOrderSummary((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = async () => {
    if (customerPhone.length !== 10) {
      setPhoneError("Phone number must be 10 digits.");
      return;
    }

    const confirmation = window.confirm(
      "By confirming this order I, the customer, am stating that I have a valid medical marijuana license and am agreeing to produce my valid card at the time of purchase."
    );
    if (!confirmation) return;

    const subtotal = orderSummary.reduce((sum, item) => sum + item.amount * item.quantity, 0);
    const totalTax = orderSummary.reduce((sum, item) => {
      const taxRate = item.category === "Edibles" ? 0.08 : 0.05;
      return sum + item.amount * item.quantity * taxRate;
    }, 0);
    const total = subtotal + totalTax;

    const now = new Date();
    const timestamp = now.toLocaleString();
    const formattedPhone = `${customerPhone.slice(0, 3)}-${customerPhone.slice(3, 6)}-${customerPhone.slice(6)}`;
    const subject = `New Order from BlockBudsters at ${timestamp}`;
    const message = `Order from:\n${customerName} - ${formattedPhone}\n--------------------\n\nTime:\n${timestamp}\n--------------------\nItems:\n${orderSummary
      .map(
        (item) =>
          `${item.quantity}x ${item.item} (${item.tier}) - $${(item.amount * item.quantity).toFixed(2)}`
      )
      .join("\n")}\n--------------------\n\nSubtotal:\n$${subtotal.toFixed(2)}\nTax:\n$${totalTax.toFixed(2)}\n\nOrder Total:\n$${total.toFixed(2)}`;

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    const customerEmail = Auth.getProfile().data.email;
    console.log("Customer email:", customerEmail);

    try {
      const response = await fetch(`${apiUrl}/api/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,
          text: message,
          customerEmail
        })
      });

      if (!response.ok) throw new Error("Email send failed");
      await response.json();
      alert("Thank you for placing your order with Block Budsters Medical Marijuana! A store employee will reach out to you shortly through the phone number you provided, and an email has ben sent to the email associated with your account. Standard rates will apply.");

      setSelectedCategory("");
      setSelectedItemId("");
      setSelectedTier("");
      setItemQuantity(1);
      setOrderSummary([]);
      setCustomerName("");
      setCustomerPhone("");
      setPhoneError("");
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

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomerPhone(value);
    if (value.length !== 10) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, opacity: 0.85 }}>
        <Typography variant="h4" gutterBottom>Place Your Order</Typography>

        <TextField select fullWidth label="Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} sx={fieldSx}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>

        {selectedCategory && (
          <>
            <TextField select fullWidth label="Product" value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)} sx={fieldSx}>
              {menuItems.map((item) => (
                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
              ))}
            </TextField>

            {selectedItem && (
              <>
                <TextField select fullWidth label="Amount" value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)} sx={fieldSx}>
                  {selectedItem.price.map((p, idx) => (
                    <MenuItem key={idx} value={p.quantity}>{p.quantity} - ${p.amount}</MenuItem>
                  ))}
                </TextField>
                <TextField type="number" fullWidth label="How many?" value={itemQuantity} onChange={(e) => setItemQuantity(Number(e.target.value))} sx={fieldSx} />
                <Button variant="contained" fullWidth onClick={handleAddToOrder} sx={{ mb: 2, backgroundColor: "#006400", '&:hover': { backgroundColor: "#004d00" } }}>
                  Add to Order
                </Button>
              </>
            )}
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mt: 2 }}>Order Summary</Typography>
        {orderSummary.length === 0 ? (
          <Typography>No items added yet.</Typography>
        ) : (
          <Box>
            {orderSummary.map((item, idx) => (
              <Box key={idx} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography>{item.quantity}x {item.item} ({item.tier}) - ${item.amount * item.quantity}</Typography>
                <IconButton color="error" size="small" onClick={() => handleRemoveItem(idx)}><CloseIcon /></IconButton>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">Subtotal: ${orderSummary.reduce((sum, item) => sum + item.amount * item.quantity, 0).toFixed(2)}</Typography>
            <Typography variant="body2">Tax: ${orderSummary.reduce((sum, item) => sum + item.amount * item.quantity * (item.category === "Edibles" ? 0.08 : 0.05), 0).toFixed(2)}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Total: ${orderSummary.reduce((sum, item) => sum + item.amount * item.quantity * (item.category === "Edibles" ? 1.08 : 1.05), 0).toFixed(2)}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <TextField fullWidth label="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} sx={fieldSx} />
        <TextField fullWidth label="Phone Number" value={customerPhone} onChange={handlePhoneInput} sx={fieldSx} error={!!phoneError} helperText={phoneError} />

        <Button variant="contained" fullWidth onClick={handleSubmitOrder} disabled={!customerName || !customerPhone || orderSummary.length === 0 || phoneError} sx={{ mt: 1, backgroundColor: "#006400", '&:hover': { backgroundColor: "#004d00" } }}>
          Submit Order
        </Button>
      </Paper>
    </Container>
  );
}

export default Order;
