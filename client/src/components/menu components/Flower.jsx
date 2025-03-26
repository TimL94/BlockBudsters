import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Divider, Grid } from "@mui/material";
import menuData from '../../utils/menu.json';
const appetizerData = menuData.filter((index) => index.category === 'Flower');


const Flower = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt:2 }}>
      <Typography variant="h4" gutterBottom>Flower
      </Typography>
      <Divider/>
      <Grid container spacing={3}>
        {appetizerData.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Card 
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: 0,
                borderRadius: 5,
                minHeight: '200px'
              }}
              raised= 'true'
              >
              <CardHeader title={item.name} />
              <CardContent>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">{item.strain}</Typography>
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

export default Flower;