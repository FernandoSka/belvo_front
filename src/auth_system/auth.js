
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const authService = {
    login: async (email, password) => {
        try {
            const response = await fetch(BACKEND_URL+'/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const access_token = data.access;
                const refresh_token = data.refresh;
                localStorage.setItem('token', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                return true;
            }
        } catch (error) {
            console.error('Error al hacer login', error);
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    refreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                const response = await fetch(BACKEND_URL+'/api/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: refreshToken,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const newAccessToken = data.access;
                    localStorage.setItem('token', newAccessToken);
                    return newAccessToken;
                }
            } catch (error) {
                console.error('Error al renovar token', error);
                return null;
            }
        }

        return null;
    },
};

export default authService;
