import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    Text,
    Button,
} from '@chakra-ui/react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { IoLogInOutline } from "react-icons/io5";
import { useRouter } from 'next/router'

import useAuth from '../../hooks/useAuth';
import Logo from '../../static/logo.svg';
import Image from 'next/image';

export default function NavBar() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <>
            <Box bg={'gray.100'} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box
                        height={"50px"}
                        ml={-4}
                        mr={5}
                        width={"140px" /*svg's max width*/}
                        position={"relative"}>
                        <Image src={Logo} objectFit={"contain"} layout={"fill"}></Image>
                    </Box>

                    <Flex alignItems={'center'}>
                        {router.pathname === "/" ? <div></div> : <Link
                            px={2}
                            py={1}
                            rounded={'md'}
                            mx={4}
                            _hover={{
                                textDecoration: 'none',
                                bg: 'gray.200',
                            }}
                            href={'/'}>
                            <Text
                                fontSize="md">
                                exibição
                            </Text>
                        </Link>}

                        {router.pathname === "/auth" ? <div></div> : <HStack>
                            {user && router.pathname !== "/new" ?
                                <Link
                                    href={"/new"}
                                    _hover={{
                                        textDecoration: 'none'
                                    }}>
                                    <Button
                                        variant={'solid'}
                                        colorScheme={'teal'}
                                        size={'md'}
                                        mr={4}
                                        leftIcon={<AddIcon />}>
                                        nova arte
                                </Button>
                                </Link> : <Box></Box>}

                            {user ? <Link
                                href={'/profile'}
                                _hover={{
                                    textDecoration: 'none'
                                }}>
                                <Avatar
                                    size={'md'}
                                    src={user.photoUrl}
                                />
                            </Link> :
                                <Link
                                    href={"auth"}
                                    _hover={{
                                        textDecoration: 'none'
                                    }}>
                                    <Button
                                        variant={'solid'}
                                        colorScheme={'blue'}
                                        size={'md'}
                                        mr={4}
                                        leftIcon={<Icon as={IoLogInOutline} w={6} h={6} />}>
                                        entrar
                                </Button>
                                </Link>}
                        </HStack>}
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
