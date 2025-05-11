import React, { useState } from "react";
import { useRegister } from "../../shared/hooks/useRegister";
import { Collapse } from "@chakra-ui/react";
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
  FormControl,
  InputRightElement,
  Avatar,
  Textarea,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaPhoneAlt, FaRegUserCircle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import "../../assets/styles/auth/login.css";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaPhoneAlt = chakra(FaPhoneAlt);
const CFaRegUserCircle = chakra(FaRegUserCircle);

const Register = () => {
  const [showMore, setShowMore] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [cuentaName, setCuentaName] = useState("");
  const [image, setImage] = useState(null);
  const { register, isLoading } = useRegister();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    register(
      name,
      email,
      password,
      profileDescription,
      phone,
      cuentaName,
      image
    );
  };

  return (
    <Flex className="flex-container">
      <Stack className="stack-container">
        <Avatar className="avatar" src={image} borderRadius="full" />
        <Heading className="heading">Create an Account</Heading>
        <Box className="form-box">
          <form onSubmit={handleSubmit}>
            <Stack className="form-container" spacing={4}>
              {/* Agrupación de campos: Nombre + Email */}
              <Stack direction={["column", "row"]} spacing={4}>
                <FormControl>
                  <InputGroup className="input-group">
                    <InputLeftElement
                      className="input-left"
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      className="input-field"
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

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
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>

              {/* Contraseña */}
              <FormControl>
                <InputGroup className="input-group">
                  <InputLeftElement
                    className="input-left"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <button
                      className="password-toggle-button"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup className="input-group">
                  <InputLeftElement
                    className="input-left"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    className="input-field"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <button
                      className="password-toggle-button"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Agrupación de campos: Teléfono + Cuenta */}
              <Stack direction={["column", "row"]} spacing={4}>
                <FormControl>
                  <InputGroup className="input-group">
                    <InputLeftElement
                      className="input-left"
                      pointerEvents="none"
                      children={<CFaPhoneAlt color="gray.300" />}
                    />
                    <Input
                      className="input-field"
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup className="input-group">
                    <InputLeftElement
                      className="input-left"
                      pointerEvents="none"
                      children={<CFaRegUserCircle color="gray.300" />}
                    />
                    <Input
                      className="input-field"
                      type="text"
                      placeholder="Cuenta Name"
                      value={cuentaName}
                      onChange={(e) => setCuentaName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>

              <Collapse in={showMore} animateOpacity>
                <FormControl mt={4}>
                  <Textarea
                    rows={3}
                    placeholder="Profile Description"
                    value={profileDescription}
                    onChange={(e) => setProfileDescription(e.target.value)}
                    sx={{
                      width: "100%", // Se asegura que ocupe todo el contenedor
                      borderRadius: "8px",
                      padding: "12px 16px",
                      border: "1px solid #ddd",
                      backgroundColor: "#fafbfc",
                      fontSize: "16px",
                      color: "#333",
                      fontFamily: "Roboto, sans-serif",
                      transition: "all 0.3s ease",
                      _focus: {
                        borderColor: "#4c9bf4",
                        boxShadow: "0 0 0 2px rgba(76, 155, 244, 0.2)",
                      },
                    }}
                  />
                </FormControl>

                <FormControl mt={4} mb={2}>
                  <label
                    htmlFor="image-upload"
                    className="input-button"
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Upload Profile Picture
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    display="none"
                  />
                </FormControl>
              </Collapse>

              <Button
                variant="link"
                onClick={() => setShowMore(!showMore)}
                color="#3872d1"
                fontWeight="500"
              >
                {showMore ? "Ocultar detalles" : "Agregar más detalles"}
              </Button>

              <Button
                className="input-button"
                type="submit"
                width="full"
                isLoading={isLoading}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>

        <Box className="signup-text">
          Already have an account? <span className="signup-link">Login</span>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
