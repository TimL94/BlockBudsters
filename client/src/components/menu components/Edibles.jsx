import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Divider, Grid } from "@mui/material";
import menuData from '../../utils/menu.json';
const ediblesData = menuData.filter((index) => index.category === 'Edibles');



const Edibles = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt:2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize:'1.9rem' }}>Edibles</Typography>
      <Divider/>
      <Grid container spacing={3}>
        {ediblesData.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Card 
              sx={{
                border: 0,
                borderRadius: 5,
                minHeight: '100px'
              }}
              raised= 'true'
              >
              <CardHeader title={item.name} />
              <CardContent>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1">{item.concentration}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1">Amount</Typography>
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

export default Edibles;