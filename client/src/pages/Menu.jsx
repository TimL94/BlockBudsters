import { Container } from "@mui/material";


function Menu() {
    return(
        <Container
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1>Menu</h1>
        </Container>
    )
}

export default Menu;