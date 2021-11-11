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
    useColorModeValue,
    Tag,
    Flex,
    VStack,
    Spacer,
    Link,
    HStack,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';

const Feed = ({ posts, feelings, typeOptions, userProfile }) => {
    const [filteredPosts, setFilteredPosts] = React.useState(posts);

    var feelingsArray = [];

    if (feelings) {
        feelingsArray = Object.keys(feelings).map(key => {
            var final = {
                label: feelings[key].title,
                value: feelings[key].uid,
            };

            return final;
        });
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

            var filteredFeelings = post.feelingsUids.filter(f => feelingsUids.includes(f));

            if (!filteredFeelings.length) {
                // no feeling matches, remove post from final

                // array = every element but that one
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

                        {
                            post.url ? (
                                post.url.split('//').pop().split('/')[0] === "i.imgur.com" ? <Box
                                    h={'480px'}
                                    bg={'gray.100'}
                                    mt={-6}
                                    mx={-6}
                                    mb={6}
                                    pos={'relative'}>

                                    <Image
                                        src={post.url}
                                        layout={'fill'}
                                        objectFit={"contain"}
                                    />
                                </Box>
                                    :
                                    <Box
                                        minH={"200px"}
                                        maxH={"720px"}
                                        mt={-6}
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
                                                letterSpacing={1.1}>
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
                                {post.feelingsUids.map(feeling => {
                                    var feelingsArray = Object.keys(feelings).map(key => feelings[key]);

                                    var title = feelingsArray.find(f => {
                                        if (f.uid !== feeling) {
                                            return;
                                        }

                                        return f;
                                    }).title;

                                    return (
                                        <Tag
                                            colorScheme={"green"}
                                            size={"sm"}
                                            mr="2"
                                            key={title}>
                                            {title}
                                        </Tag>
                                    );
                                })}
                            </Flex>

                            <Heading
                                color={'gray.700'}
                                fontSize={'2xl'}
                                fontFamily={'body'}>
                                {post.title}</Heading>

                            <Text color={'gray.500'}>{post.description}</Text>
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
                    </Box>
                </VStack>
            )) : <VStack>
                <Center>
                    <Text>
                        Ainda não temos nenhuma arte
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