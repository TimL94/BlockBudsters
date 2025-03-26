import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Divider, Grid } from "@mui/material";
import menuData from '../../utils/menu.json';
const specialsData = menuData.filter((index) => index.category === 'Specials');


const Specials = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt:2 }}>
      <Typography variant="h4" gutterBottom>Specials</Typography>
      <Divider/>
      <Grid container spacing={3}>
        {specialsData.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Card 
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: 0,
                borderRadius: 5,
                minHeight: '100px'
              }}
              raised= 'true'
              >
              <CardHeader title={item.name} />
              <CardContent>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">{
                  item.sizes.map((size, idx) => (
                    <Typography key={idx} variant="body2">{`${size.size}: ${size.price}`}
                    </Typography>
                  ))
                  }</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Specials;