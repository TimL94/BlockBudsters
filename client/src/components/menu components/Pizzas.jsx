import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Divider, Grid } from "@mui/material";
import menuData from '../../utils/menu.json';

const pizzaData = menuData.filter((item) => item.category === 'Pizzas');

const Pizzas = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>Pizzas</Typography>
      <Divider/>
      <Grid container spacing={3}>
        {pizzaData.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Card>
              <CardHeader title={item.name} />
              <CardContent>
                <Typography variant="body1">{item.description}</Typography>
                <Divider sx={{ my: 2 }} />
                {item.sizes.map((size, idx) => (
                  <Typography key={idx} variant="body2">{`${size.size}: ${size.price}`}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Pizzas;
