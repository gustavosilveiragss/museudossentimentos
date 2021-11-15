import React, { ReactNode } from 'react';
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
  FiLogOut,
  FiSend
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { RiGalleryLine } from "react-icons/ri";
import { ReactText } from 'react';
import Feed from './components/feed';
import useAuth from '../hooks/useAuth';
import Router from 'next/router';

function Profile({
  children,
  user,
  props,
}: {
  children: ReactNode,
  user: any,
  props: any
}) {
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
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Feed {...props}></Feed>
      </Box>
    </Box>
  );
}

Profile.getInitialProps = async (ctx) => {
  var cookie = ctx.req.headers.cookie;

  cookie = cookie.replace('auth=', '');

  var userRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${cookie}`, {
    method: "GET"
  });
  var user = (await userRes.json()).user;

  var postsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/author/${cookie}?`
    + new URLSearchParams({
      user: JSON.stringify(user)
    }), {
    method: "GET"
  });
  user.posts = (await postsRes.json()).posts;

  var res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/feelings/fetch`, {
    method: "GET"
  });
  const feelings = await res.json();

  var props = {
    feelings: feelings.feelings,
    posts: user.posts,
    typeOptions: [
      "poesia",
      "pintura",
      "escultura",
      "fotografia",
      "vídeo",
      "texto",
      "música",
      "áudio"
    ],
    userProfile: user
  };

  return {
    user: user,
    props: props,
  };
}

export default Profile;

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { signout } = useAuth();

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
      <NavItem key="Exibição" icon={RiGalleryLine} onclick={() => Router.push('/')}>
        Exibição
      </NavItem>
      <NavItem key="Sair" icon={FiLogOut} onclick={signout}>  
        Sair
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  onclick: any;
}

const NavItem = ({ icon, children, onclick}: NavItemProps) => {
  return (
    <Link href="#" onClick={onclick} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer">
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
  user: any;
}
const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
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
              src={user.photoUrl}
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">{user.name}</Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};
