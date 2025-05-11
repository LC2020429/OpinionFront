import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useLogin } from "../../shared/hooks/useLogin";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import "../../assets/styles/auth/login.css";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    } else {
      toast.error("Por favor, ingrese su correo electrónico y contraseña.");
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex className="flex-container">
      <Stack className="stack-container">
        <Avatar className="avatar" />
        <Heading className="heading">Bienvenido</Heading>
        <Box className="form-box">
          <form onSubmit={handleSubmit}>
            <Stack className="form-container">
              <FormControl>
                <InputGroup className="input-group">
                  <InputLeftElement
                    className="input-left"
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    className="input-field"
                    type="email"
                    placeholder="correo"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup className="input-group">
                  <InputLeftElement
                    className="input-left"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement width="3rem">
                    <button
                      className="password-toggle-button"
                      onClick={handleShowClick}
                      type="button"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </InputRightElement>
                </InputGroup>
                <Box className="signup-text">
                  Sin cuenta?{" "}
                  <Link
                    as={RouterLink}
                    to="/auth/register"
                    className="signup-link"
                  >
                    Sign Up
                  </Link>
                </Box>
              </FormControl>

              <Button
                className="input-button"
                type="submit"
                width="full"
                isLoading={isLoading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
