import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    Text,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { IoLogInOutline } from "react-icons/io5";

import useAuth from '../../hooks/useAuth';

export default function NavBar() {
    const { user } = useAuth();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack alignItems={'center'}>
                        <Box>LOGO</Box>
                    </HStack>

                    <Flex alignItems={'center'}>
                        <Link
                            px={2}
                            py={1}
                            rounded={'md'}
                            mx={4}
                            _hover={{
                                textDecoration: 'none',
                                bg: useColorModeValue('gray.200', 'gray.700'),
                            }}
                            href={'/'}>
                            <Text
                                fontSize="md">
                                exibição
                            </Text>
                        </Link>

                        {user ?
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
                            href={'/user/' + user.uid}
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
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
