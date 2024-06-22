import { Container } from "@mui/material";


function Order() {
    return(
        <Container
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1>Order</h1>
        </Container>
    )
}

export default Order;