import { Box, Card, CardContent, CardHeader, Typography, Divider, Grid } from "@mui/material";
import menuData from '../../utils/menu.json'

const drinkData = menuData.filter((index) => index.category === 'Drinks');

const Drinks = (Array) => {

    return (
        <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt:2 }}>
            <Typography variant="h4" gutterBottom>Drinks</Typography>
            <Divider/>
            <Grid container spacing={3}>
                {drinkData.map((item, index) => (
                    <Grid item md={6} x s={12} key={index}>
                        <Card>
                            <CardHeader
                            title={item.name}
                            />
                            <CardContent>
                                {item.price}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Drinks;