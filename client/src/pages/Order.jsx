import { Container, Link } from "@mui/material";


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
            <Link href='https://www.toasttab.com/local/order/603pizza/r-9ffe1139-45e2-4d9b-8aff-ed2dc38760c2'>
                <h3>Order Here</h3>
            </Link>
        </Container>
    )
}

export default Order;