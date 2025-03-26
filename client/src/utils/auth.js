import jwtDecode from 'jwt-decode';

class Auth {
    getToken() {
        return localStorage.getItem('id_token');
    }

    getProfile() {
        return jwtDecode(this.getToken());
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        const token = localStorage.getItem('id_token');
        if (token) {
            localStorage.removeItem('id_token');
            window.location.assign('/');
        }
    }

    isTokenExpired(token) {
        const decode = jwtDecode(token);

        if (decode.exp < Date.now() / 1000) {
            return true;
        } else {
            return false;
        }
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

}

export default new Auth();