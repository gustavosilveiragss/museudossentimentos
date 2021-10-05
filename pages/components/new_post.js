import {
    Button,
    FormControl,
    FormErrorMessage,
    Flex,
    Heading,
    Textarea,
    Stack,
    Text,
    useColorModeValue,
    useRadioGroup,
    FormLabel,
    Wrap,
    WrapItem,
    Input
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from "react-hook-form";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import RadioCard from "./radio_card"
import useAuth from "../../hooks/useAuth";

const NewPost = ({ feelings }) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();

    // TODO: change this to an enum
    const type_options = ["poesia", "pintura", "escultura", "fotografia", "video", "texto", "outro"]

    const [type, setType] = React.useState("poesia");

    const [mediaComponent, setMediaComponent] = React.useState();

    const { user } = useAuth();

    var feelingsArray = Object.keys(feelings).map(key => {
        var final = {
            label: feelings[key].title,
            value: feelings[key].uid,
        };

        return final;
    });

    const [pickerFeelings, setPickerFeelings] = React.useState(feelingsArray);
    const [selectedFeelings, setSelectedFeelings] = React.useState(new Array());

    const handleSelectedItemsChange = (changes) => {
        if (changes) {
            setSelectedFeelings(changes.selectedItems)
        };
    };

    const handleTypeRadio = (e) => {
        const value = e.target.value;
        setType(value);

        switch (value) {
            case "poesia":
            case "texto":
                setMediaComponent(
                    <FormControl id="content" isInvalid={errors.content}>
                        <FormLabel>Conteúdo</FormLabel>
                        <Textarea
                            placeholder={value == "poesia" ? "Sua poesia aqui!" : "Seu texto aqui!"}
                            size="lg"
                            {...register("content", {
                                required: "Conteúdo é obrigatório"
                            })} />
                        <FormErrorMessage>
                            {errors.content && errors.content.message}
                        </FormErrorMessage>
                    </FormControl>
                );
                break;
            case "pintura" || "escultura":
                //file drop
                break;
            case "video":
                // file drop
                break;
            case "outro":
                // select content type
                // name the type
                break;
        }
    };

    const handleSend = async (values) => {
        values.type = type;

        values.authorUid = user.uid;

        await fetch("/api/posts/new/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(res => {
            console.log(res.json());
        });
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "type",
        value: type,
        onChange: setType,
    });

    const group = getRootProps();

    return (
        <Flex
            minH={'80h'}
            align={'top'}
            justify={'center'}>

            <Stack
                spacing={4}
                w={'full'}
                maxW={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'xs'}
                p={6}
                m={3}
                my={12}>

                <Heading lineHeight={1.1} fontSize={{ md: 'xl' }}>
                    Nova arte
                </Heading>

                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    Publique seus sentimentos no museu
                </Text>

                <form onSubmit={handleSubmit(handleSend)}>

                    <FormControl id="type">
                        <FormLabel>Tipo</FormLabel>
                        <Wrap {...group}>
                            {type_options.map((value) => {
                                const radio = getRadioProps({ value })
                                return (
                                    <WrapItem key={value}>
                                        <RadioCard
                                            key={value}
                                            {...radio}
                                            onChange={(e) => handleTypeRadio(e)}>
                                            {value}
                                        </RadioCard>
                                    </WrapItem>
                                );
                            })}
                        </Wrap>
                    </FormControl>

                    <FormControl id="feeling" isInvalid={errors.feeling}>
                        <CUIAutoComplete
                            label="Selecione os sentimentos"
                            placeholder="Selecione um sentimento já existente, ou registre um novo"
                            items={pickerFeelings}
                            selectedItems={selectedFeelings}
                            hideToggleButton={true}
                            onSelectedItemsChange={(changes) =>
                                handleSelectedItemsChange(changes)
                            }
                            disableCreateItem={true}
                            {...register("feeling", {
                                required: selectedFeelings.length === 0 ? "Selecione pelo menos um sentimento" : ""
                            })}
                        />
                        <FormErrorMessage>
                            {errors.feeling && errors.feeling.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="title" isInvalid={errors.title}>
                        <FormLabel>Título</FormLabel>
                        <Input
                            placeholder="Título"
                            size="lg"
                            {...register("title", {
                                required: "Título é obrigatório"
                            })}
                        />
                        <FormErrorMessage>
                            {errors.title && errors.title.message}
                        </FormErrorMessage>
                    </FormControl>

                    {mediaComponent !== undefined ? mediaComponent :
                        <FormControl id="content" isInvalid={errors.content}>
                            <FormLabel>Conteúdo</FormLabel>
                            <Textarea
                                placeholder="Sua poesia aqui!"
                                size="lg"
                                {...register("content", {
                                    required: "Conteúdo é obrigatório"
                                })} />
                            <FormErrorMessage>
                                {errors.content && errors.content.message}
                            </FormErrorMessage>
                        </FormControl>
                    }

                    <FormControl id="description" isInvalid={errors.description}>
                        <FormLabel>Descrição</FormLabel>
                        <Textarea
                            placeholder="Descreva sua obra"
                            size="lg"
                            {...register("description", {
                                required: "Descrição é obrigatória"
                            })} />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Stack spacing={6}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            isLoading={isSubmitting}
                            type="submit">
                            Enviar Arte
                    </Button>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    );
}

export default NewPost;