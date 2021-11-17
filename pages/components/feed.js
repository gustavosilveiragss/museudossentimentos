import React from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import Image from 'next/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    Tag,
    Flex,
    VStack,
    Spacer,
    Link,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

const Feed = ({ posts, feelings, typeOptions, userProfile, author }) => {
    const router = useRouter();

    const [filteredPosts, setFilteredPosts] = React.useState(posts);

    var feelingsArray = [];

    if (posts) {
        for (const p of posts) {
            feelingsArray = Object.keys(feelings).map(key => {
                const f = feelings[key];

                var final = {
                    label: f.title,
                    value: f.uid
                };

                if (p.feelingUid === f.uid) {
                    p.feeling = f;
                }

                return final;
            });
        }
    }

    // esses lixo de if são só pra ver se ta fazendo o pre render da build, qualquer coisa seta tudo so pra nao dar erro
    if (!typeOptions) {
        posts = [];
        feelings = [];
        typeOptions = [];
        userProfile = false;
    }

    var typeOptionsArray = new Array();
    typeOptions.forEach(type => {
        typeOptionsArray.push({
            label: type,
            value: type
        });
    });

    const [pickerFeelings, setPickerFeelings] = React.useState(feelingsArray);
    const [selectedFeelings, setSelectedFeelings] = React.useState(new Array());

    const [pickerTypes, setPickerTypes] = React.useState(typeOptionsArray);
    const [selectedTypes, setSelectedTypes] = React.useState(new Array());

    const feelingsChange = (changes) => {
        if (changes) {
            setSelectedFeelings(changes.selectedItems);

            filter(changes.selectedItems, selectedTypes);
        };
    };

    const typesChange = (changes) => {
        if (changes) {
            setSelectedTypes(changes.selectedItems);

            filter(selectedFeelings, changes.selectedItems);
        };
    };

    const filter = (feelings, types) => {
        var final = Array.from(posts);
        var matchingTypePosts = new Array();

        var feelingsUids = feelings.map(a => a.value);

        // if theres no feeling selected, default is everything
        if (!feelings.length) {
            feelingsUids = pickerFeelings.map(a => a.value);
        }

        // This is not a performance efficient way of doing this
        // I have a deadline, I dont care
        for (const post of posts) {
            // check if post matches feelings

            if (!feelingsUids.includes(post.feelingUid)) {
                final = final.filter(p => p.uid !== post.uid);

                continue;
            }

            // check if post matches types

            for (const type of types) {
                if (post.type == type.value) {
                    // this type matches, you already know it goes into final

                    matchingTypePosts.push(post);

                    break;
                }
            }
        }

        // if there are types, only include posts that match it
        if (types.length) {
            final = final.filter(post => matchingTypePosts.includes(post));
        }

        setFilteredPosts(final);
    };

    const deletePost = async post => {
        if (post.ref && post.ref != "") {
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/storage/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ref: post.ref
                })
            });
        }

        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: post.uid
            })
        });

        router.reload(window.location.pathname)
    };

    return (
        <div>
            <Center>
                <Flex
                    maxW="1080px"
                    w="full"
                    px="20px">
                    <Stack
                        direction="column-reverse">
                        <HStack>
                            {userProfile ?
                                <Avatar
                                    mb="10px"
                                    src={userProfile.photoUrl}
                                />
                                : <div></div>}
                            <Text
                                textTransform={'uppercase'}
                                fontWeight={600}
                                fontSize={{ base: "1em", md: "2em", lg: "3em" }}
                                mb={'10px'}
                                mr="10px">
                                {userProfile ? userProfile.name : "Exibição"}
                            </Text>
                        </HStack>
                    </Stack>
                    <Spacer />
                    <Stack>
                        <Box
                            mb={-8}>
                            <CUIAutoComplete
                                placeholder="Filtre por tipos"
                                items={pickerTypes}
                                selectedItems={selectedTypes}
                                hideToggleButton={true}
                                onSelectedItemsChange={(changes) =>
                                    typesChange(changes)
                                }
                                disableCreateItem={true}
                            />
                        </Box>
                        <Box>
                            <CUIAutoComplete
                                placeholder="Filtre por sentimentos"
                                items={pickerFeelings}
                                selectedItems={selectedFeelings}
                                hideToggleButton={true}
                                onSelectedItemsChange={(changes) =>
                                    feelingsChange(changes)
                                }
                                disableCreateItem={true}
                            />
                        </Box>
                    </Stack>
                </Flex>
            </Center>
            {posts && posts.length > 0 ? filteredPosts && filteredPosts.length > 0 ? filteredPosts.map(post => (
                <VStack m={4} key={post.uid}>
                    <Box
                        maxW={'1080px'}
                        w={'full'}
                        bg={'white'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        p={6}
                        overflow={'hidden'}>
                        <Box
                            zIndex={2}
                            mb={0}
                            pos={'relative'}>
                            <Flex>
                                <Spacer />
                                {userProfile && !author ? <IconButton mb={4} padding={0} onClick={() => deletePost(post)} icon={<FiTrash2 />} /> : <div></div>}
                            </Flex>
                        </Box>

                        {
                            post.url ? (
                                post.url.split('//').pop().split('/')[0] === "i.imgur.com" ?

                                    <Box
                                        h={'480px'}
                                        bg={'gray.100'}
                                        mt={userProfile && !author ? -20 : -6}
                                        mx={-6}
                                        mb={6}
                                        pos={'relative'}>

                                        <Image
                                            src={post.url}
                                            layout={'fill'}
                                            objectFit={"contain"}
                                        />
                                    </Box>

                                    : <Box
                                        minH={"200px"}
                                        maxH={"720px"}
                                        mt={userProfile && !author ? -20 : -6}
                                        mx={-6}
                                        mb={6}
                                        pos={'relative'}>
                                        <Center
                                            bg={'gray.100'}>
                                            <ReactPlayer
                                                url={post.url}
                                                controls={true}
                                            />
                                        </Center>
                                    </Box>

                            )

                                : <Box
                                    minH={"200px"}
                                    maxH={"600px"}
                                    mt={-6}
                                    mx={-6}
                                    mb={6}
                                    pos={'relative'}>
                                    <Center
                                        margin="10px">
                                        <Box>
                                            <Text
                                                fontSize={'1em'}
                                                letterSpacing={1.1}
                                                whiteSpace="pre-line">
                                                {post.content}
                                            </Text>
                                        </Box>
                                    </Center>
                                </Box>
                        }

                        <Stack>
                            <Text
                                textTransform={'uppercase'}
                                fontWeight={600}
                                fontSize={'0.6em'}
                                letterSpacing={1.1}>
                                {post.type}</Text>

                            <Flex>
                                {
                                    <Tag
                                        colorScheme={"green"}
                                        size={"sm"}
                                        mr="2"
                                        key={post.feeling.title}>
                                        {post.feeling.title}
                                    </Tag>
                                }
                            </Flex>

                            <Heading
                                color={'gray.700'}
                                fontSize={'2xl'}
                                fontFamily={'body'}>
                                {post.title}</Heading>

                            <Text color={'gray.500'} whiteSpace="pre-line">{post.description}</Text>
                        </Stack>

                        {userProfile ? <div></div> : <Link
                            href={'/user/' + post.author.uid}
                            _hover={{
                                textDecoration: 'none'
                            }}>
                            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                <Avatar src={post.author.photoUrl} />

                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text fontWeight={600}>{post.author.name}</Text>
                                </Stack>
                            </Stack>
                        </Link>}

                        <Stack mt={6} direction={'row'} spacing={0}>
                            <Text fontSize={14}>
                                {post.feeling.message + '\u00A0'}
                            </Text>
                            <Link
                                href={post.feeling.url}>
                                <Text fontSize={14} color={"green.600"}>
                                    {post.feeling.ref}
                                </Text>
                            </Link>
                        </Stack>
                    </Box>
                </VStack>
            )) : <VStack>
                <Center>
                    <Text>
                        Ainda não temos nenhuma arte assim
                    </Text>
                </Center>
                <Text>Mas a sua pode ser a primeira!
                </Text>
            </VStack> : <VStack>
                <Center>
                    <Text>
                        {userProfile ? "Esse usuário ainda não publicou nada" : "Ainda não temos nenhuma arte"}
                    </Text>
                </Center>
            </VStack>}
        </div >
    );
}

export default Feed;