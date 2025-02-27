import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/admin'); // Redirige a la pantalla de inicio de sesión
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Bienvenidos a Casa Grande</h1>
            <button style={styles.button} onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default HomeScreen;
