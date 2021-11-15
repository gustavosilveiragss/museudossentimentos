import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from 'react';
import {
  Button,
  Center,
  HStack,
  Icon,
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from "react-icons/bs";

import NavBar from "./components/navbar"

const Auth = () => {
  const {
    user,
    signinGoogle,
    signinGithub,
    signout,
  } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  function handleAuth(method) {
    switch (method) {
      case "google":
        signinGoogle().then(response => {
          if (typeof response === "undefined" || response?.message === null) {
            return;
          }

          setErrorMessage(response.message);
        });

        break;
      case "github":
        signinGithub().then(response => {
          if (typeof response === "undefined" || response?.message === null) {
            return;
          }

          setErrorMessage(response.message);
        });

        break;
    }
  }

  return (
    <div>
      <NavBar></NavBar>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Entre com sua conta</Heading>

            <Text fontSize={'lg'} color={'gray.600'}>
              para poder publicar sua própria arte!
          </Text>
          </Stack>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={() => handleAuth("google")}>
                <Center>
                  <Text>Entrar com conta do Google</Text>
                </Center>
              </Button>

              <Button
                w={'full'}
                maxW={'md'}
                backgroundColor="gray.800"
                onClick={() => handleAuth("github")}>
                <Center>
                  <HStack>
                    <Icon as={BsGithub} color="white"></Icon>

                    <Text
                      color="white">
                      Entrar com conta do Github
                  </Text>
                  </HStack>
                </Center>
              </Button>
              <p>{errorMessage}</p>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}


export default Auth;
