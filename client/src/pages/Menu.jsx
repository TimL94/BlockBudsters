import { Container } from "@mui/material";


function Menu() {
    return(
        <Container
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <h1>Menu</h1>
        </Container>
    )
}

export default Menu;