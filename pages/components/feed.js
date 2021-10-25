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
    Select,
    useColorModeValue,
    Tag,
    Grid,
    Container,
    Flex,
    VStack,
} from '@chakra-ui/react';

const Feed = ({ posts, feelings, typeOptions }) => {
    posts = Object.keys(posts).map(key => posts[key]);

    const [filteredPosts, setFilteredPosts] = React.useState(posts);

    const feelingsArray = Object.keys(feelings).map(key => {
        var final = {
            label: feelings[key].title,
            value: feelings[key].uid,
        };

        return final;
    });

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
    }

    return (
        <div>
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
            <VStack m={4}>
                <Box
                    maxW={'1080px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>

                    <Box
                        h={'480px'}
                        bg={'gray.100'}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={'relative'}>

                        <Image
                            src={'https://i.imgur.com/e330bF5.jpeg'}
                            layout={'fill'}
                            objectFit={"contain"}
                        />
                    </Box>

                    <Stack>
                        <Text
                            textTransform={'uppercase'}
                            fontWeight={600}
                            fontSize={'0.6em'}
                            letterSpacing={1.1}>
                            Fotografia</Text>

                        <Flex>
                            <Tag
                                colorScheme={"green"}
                                size={"sm"}
                                mr="2">
                                Amor
                            </Tag>
                            <Tag
                                colorScheme={"green"}
                                size={"sm"}
                                mr="2">
                                Afeto
                            </Tag>
                            <Tag
                                colorScheme={"green"}
                                size={"sm"}
                                mr="2">
                                Carinho
                            </Tag>
                            <Tag
                                colorScheme={"green"}
                                size={"sm"}>
                                Saudade
                            </Tag>
                        </Flex>

                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            Título</Heading>

                        <Text color={'gray.500'}>Descrição</Text>
                    </Stack>

                    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />

                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>Nome do amiguinho</Text>
                        </Stack>
                    </Stack>
                </Box>
            </VStack>
            {/*filteredPosts.map(post => (
                <div key={post.id} style={{ margin: '30px' }}>
                    <div>{`título: ${post.title}`}</div>
                    <div>{`tipo: ${post.type}`}</div>
                    <div>{"sentimentos: " + post.feelingsUids.map(feeling => {
                        var feelingsArray = Object.keys(feelings).map(key => feelings[key]);

                        var title = feelingsArray.find(f => {
                            if (f.uid !== feeling) {
                                return;
                            }

                            return f;
                        }).title;

                        return title;
                    })}</div>
                </div>
                ))*/}
        </div >
    );
}

export default Feed;