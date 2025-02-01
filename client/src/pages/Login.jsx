// https://github.com/mui/material-ui/tree/v6.4.2/docs/data/material/getting-started/templates/sign-in
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function Login(props) {
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

    const loginApi = (username, password) => {
        fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let { message } = data;
                if (!message) {
                    navigate("/");
                    return;
                }
                alert(message);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleSubmit = (event) => {
        if (nameError || passwordError) {
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        loginApi(data.get('name'), data.get('password'))
    };

    const validateInputs = () => {
        const name = document.getElementById('name');
        const password = document.getElementById('password');

        let isValid = true;

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }
        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <LoginContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Username</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                placeholder="Username"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        {/* <FormControlLabel */}
                        {/*     control={<Checkbox value="remember" color="primary" />} */}
                        {/*     label="Remember me" */}
                        {/* /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Login
                        </Button>
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </LoginContainer>
        </>
    );
}
