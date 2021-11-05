import React, { ReactNode, useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiLogOut,
  FiSend
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import useAuth from '../../hooks/useAuth';
import Router from 'next/router';
import cookie from 'js-cookie';

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const [loaded, setLoaded] = useState(true);

  const { user } = useAuth();
  
  /*var auth = cookie.get("auth");

  console.log(auth);

  var fixedCookie = auth.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');

  console.log(JSON.parse(fixedCookie));

  useEffect(() => {
    if (!user) {
      Router.push('/');
    }

    else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div></div>;
  }*/

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('gray.200', 'gray.700')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <NavItem key="Suas publicações" icon={FiSend}>
        Suas publicações
      </NavItem>
      <NavItem key="Sair" icon={FiLogOut}>
        Sair
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottomWidth="1px"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <HStack>
            <Avatar
              size={'sm'}
              src={
                'https://lh3.googleusercontent.com/a/AATXAJyDhztFrJLSNSWVxs-ppRxmA73Lt6etCFioQWXe=s96-c'
              }
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">Gustavo Silva</Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};
