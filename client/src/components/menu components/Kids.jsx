import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Divider, Grid } from "@mui/material";
import menuData from '../../utils/menu.json';
const kidsData = menuData.filter((index) => index.category === 'Kids');


const Kids = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt:2 }}>
      <Typography variant="h4" gutterBottom>Kids</Typography>
      <Divider/>
      <Grid container spacing={3}>
        {kidsData.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Card>
              <CardHeader title={item.name} />
              <CardContent>
                <Typography variant="body1">{item.description}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">{`${item.price}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Kids;