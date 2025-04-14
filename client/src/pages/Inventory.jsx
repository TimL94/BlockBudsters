import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem as MuiMenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  IconButton
} from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material"; // Icon import
import { useMutation } from "@apollo/client";
import { ADD_MENU_ITEM } from "../utils/mutations";
import heic2any from "heic2any";

const categories = ["Flower", "Pre Rolls", "Concentrates", "Edibles", "Limited", "Special"];
const strains = ["Indica", "Sativa", "Hybrid"];
const effects = [
  "Sleep", "Energy", "Focus", "Anxiety", "Depression",
  "Pain", "Stress", "Appetite", "Creativity", "Euphoria"
];

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
  const [selectedEffects, setSelectedEffects] = useState([]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let converted = null;
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

    setImageFile(converted || file);
  };

  const handlePriceChange = (index, field, value) => {
    const updated = [...priceInput];
    updated[index][field] = value;
    setPriceInput(updated);
  };

  const addPriceField = () => {
    setPriceInput([...priceInput, { quantity: "", amount: "" }]);
  };

  const removePriceField = (index) => {
    const updated = [...priceInput];
    updated.splice(index, 1);
    setPriceInput(updated);
  };

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      const blob = new Blob([file], { type: file.type });
      formData.append("file", blob, file.name);

      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      const uploadEndpoint = `${apiUrl}/api/upload`;

      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);
        throw new Error("Image upload failed");
      }

      const data = await response.json();
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
          effect: selectedEffects
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

          <FormControl>
            <InputLabel id="effect-label">Effects</InputLabel>
            <Select
              labelId="effect-label"
              multiple
              value={selectedEffects}
              onChange={(e) => setSelectedEffects(e.target.value)}
              input={<OutlinedInput label="Effects" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{ PaperProps: { style: { maxHeight: 140 } } }}
            >
              {effects.map((effect) => (
                <MuiMenuItem key={effect} value={effect}>
                  <Checkbox checked={selectedEffects.indexOf(effect) > -1} />
                  <ListItemText primary={effect} />
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>

          {priceInput.map((price, idx) => (
            <Box key={idx} display="flex" gap={2} alignItems="center">
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
              {priceInput.length > 1 && (
                <IconButton
                  onClick={() => removePriceField(idx)}
                  sx={{
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#cc0000',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>−</Typography>
                </IconButton>
              
              )}
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
