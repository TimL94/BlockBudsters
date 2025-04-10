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
import heic2any from "heic2any";

const categories = [
  "Flower",
  "Pre Rolls",
  "Concentrates",
  "Edibles",
  "Limited",
  "Special"
];
const strains = ["Indica", "Sativa", "Hybrid"];

const buttonStyle = {
  width: "40%",
  m: "auto",
  borderRadius: 5,
  backgroundColor: "#006400",
  "&:hover": {
    backgroundColor: "#004d00"
  }
};

function Inventory() {
  const [addMenuItem] = useMutation(ADD_MENU_ITEM);
  const [imageFile, setImageFile] = useState(null);
  const [priceInput, setPriceInput] = useState([{ quantity: "", amount: "" }]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // console.log("File name:", file.name);
    // console.log("File type:", file.type);
    // console.log("File size:", file.size);
    // console.log("File instanceof Blob?", file instanceof Blob);
    // console.log("File instanceof File?", file instanceof File);
    // console.log("File:", file);

    let converted = null;

    // Try converting anything that's not image/jpeg to JPEG
    if (file.type !== "image/jpeg") {
      try {
        const jpegBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9
        });

        converted = new File(
          [jpegBlob],
          file.name.replace(/\.[^.]+$/, ".jpg"),
          { type: "image/jpeg" }
        );
      } catch (err) {
        console.warn("Conversion failed, falling back to original file:", err);
      }
    }

    // Use the converted file if successful; otherwise fall back to original
    setImageFile(converted || file);
  };

  const handlePriceChange = (index, field, value) => {
    const updated = [...priceInput];
    updated[index][field] = value;
    setPriceInput(updated);
  };

  const addPriceField = () => {
    setPriceInput([...priceInput, { quantity: "", Amount: "" }]);
  };

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
  
      const blob = new Blob([file], { type: file.type });
      formData.append("file", blob, file.name);
  
      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      const uploadEndpoint = `${apiUrl}/api/upload`;
      // console.log("Uploading to:", uploadEndpoint);
  
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);
        throw new Error("Image upload failed");
      }
  
      const data = await response.json();
      console.log("Cloudinary response:", data);
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
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

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

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
    <Container sx={{ mt: 4, maxWidth: 350 }}>
      <Paper elevation={10} sx={{ p: 4, borderRadius: 5, opacity: 0.85 }}>
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
          <TextField name="category" label="Category" required select defaultValue="">
            {categories.map((cat) => (
              <MuiMenuItem key={cat} value={cat}>
                {cat}
              </MuiMenuItem>
            ))}
          </TextField>
          <TextField name="strain" label="Strain" required select defaultValue="">
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
                onChange={(e) =>
                  handlePriceChange(idx, "quantity", e.target.value)
                }
                required
              />
              <TextField
                label="Price"
                type="number"
                value={price.amount}
                onChange={(e) =>
                  handlePriceChange(idx, "amount", e.target.value)
                }
                required
              />
            </Box>
          ))}
          <Button variant="contained" onClick={addPriceField} sx={{ ...buttonStyle, width: "85%" }}>
            Add Price Tier
          </Button>
          <Box textAlign="center">
            <label htmlFor="upload-image">
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
                required
              />
              <Button
                variant="contained"
                component="span"
                sx={{ ...buttonStyle, width: "85%", mt: 1 }}
              >
                Choose Image
              </Button>
            </label>
            {imageFile && (
              <Typography variant="body2" mt={1} color="text.secondary">
                Image selected
              </Typography>
            )}
          </Box>

          <Button type="submit" variant="contained" sx={{ ...buttonStyle, mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Inventory;