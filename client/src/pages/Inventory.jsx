import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem as MuiMenuItem
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_MENU_ITEM } from "../utils/mutations";

const categories = [
  "Flower",
  "Pre Rolls",
  "Concentrates",
  "Edibles",
  "Limited",
  "Special"
];
const strains = ["Indica", "Sativa", "Hybrid"];

function Inventory() {
  // Mutation should be updated to accept imageUrl as well.
  const [addMenuItem] = useMutation(ADD_MENU_ITEM);
  const [imageFile, setImageFile] = useState(null);
  const [priceInput, setPriceInput] = useState([{ quantity: "", amount: "" }]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePriceChange = (index, field, value) => {
    const updated = [...priceInput];
    updated[index][field] = value;
    setPriceInput(updated);
  };

  const addPriceField = () => {
    setPriceInput([...priceInput, { quantity: "", amount: "" }]);
  };

  // Function to upload the image using our REST endpoint
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData(event.currentTarget);
      const name = form.get("name");
      const category = form.get("category");
      const strain = form.get("strain");

      const formattedPrice = priceInput.map((p) => ({
        quantity: p.quantity,
        amount: parseFloat(p.amount)
      }));

      // Upload image to Cloudinary and get its URL
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      // Call GraphQL mutation passing the imageUrl along with other data
      const { data } = await addMenuItem({
        variables: {
          name,
          category,
          strain,
          price: formattedPrice,
          imageUrl,
        }
      });

      console.log("Menu item added:", data);
      alert("Menu item successfully added!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error adding menu item. Check console for details.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={10} sx={{ p: 4, borderRadius: 5 }}>
        <Typography variant="h5" mb={2}>
          Add New Menu Item
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField name="name" label="Name" required />
          <TextField name="category" label="Category" required select>
            {categories.map((cat) => (
              <MuiMenuItem key={cat} value={cat}>
                {cat}
              </MuiMenuItem>
            ))}
          </TextField>
          <TextField name="strain" label="Strain" required select>
            {strains.map((s) => (
              <MuiMenuItem key={s} value={s}>
                {s}
              </MuiMenuItem>
            ))}
          </TextField>
          {priceInput.map((price, idx) => (
            <Box key={idx} display="flex" gap={2}>
              <TextField
                label="Quantity"
                value={price.quantity}
                onChange={(e) => handlePriceChange(idx, "quantity", e.target.value)}
                required
              />
              <TextField
                label="Amount"
                type="number"
                value={price.amount}
                onChange={(e) => handlePriceChange(idx, "amount", e.target.value)}
                required
              />
            </Box>
          ))}
          <Button variant="outlined" onClick={addPriceField}>
            Add Price Tier
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Inventory;
