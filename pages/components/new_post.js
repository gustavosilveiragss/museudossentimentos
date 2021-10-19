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
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import Dropzone from 'react-dropzone';
import bytes from "bytes";

import RadioCard from "./radio_card";
import useAuth from "../../hooks/useAuth";

const NewPost = ({ feelings }) => {
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();

    const type_options = [
        "poesia",
        "pintura",
        "escultura",
        "fotografia",
        "video",
        "texto",
        "música",
        "áudio"
    ];

    // just dont question it
    var updatedType = "poesia";
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

    var fileElement = <div></div>;
    const [selectedFile, setSelectedFile] = React.useState(undefined);

    const handleSelectedItemsChange = (changes) => {
        if (changes) {
            setSelectedFeelings(changes.selectedItems)
        };
    };

    const handleTypeRadio = async (e) => {
        const value = e.target.value;

        updatedType = value;
        setType(value);

        setSelectedFile(undefined);

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
            case "pintura":
            case "fotografia":
                buildDropzone("image/jpeg, image/png", ".jpeg ou .png", "20mb");
                break;
            case "escultura":
                buildDropzone("image/jpeg, image/png, video/mp4", ".jpeg, .png e .mp4", "7kb");
                break;
            case "video":
                buildDropzone("video/mp4", ".mp4", "100mb");
                break;
            case "música":
            case "áudio":
                buildDropzone("audio/mpeg", ".mp1, .mp2 e .mp3", "50mb");
                break;
        }
    };

    const buildDropzone = (accept, extensions, maxSize) => {
        setMediaComponent(
            <FormControl id="content" isInvalid={errors.content}>
                <FormLabel>Conteúdo</FormLabel>
                <Dropzone
                    accept={accept}
                    maxSize={bytes(maxSize)}
                    onDrop={fileDrop}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Arraste ou selecione o arquivo</p>
                                <em>(Apenas arquivos do tipo {extensions} e menores que {maxSize} serão aceitos)</em>
                                <aside>
                                    <h4>Arquivo</h4>
                                    <ul>
                                        {fileElement}
                                    </ul>
                                </aside>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <FormErrorMessage>
                    {errors.dropzone && errors.dropzone.message}
                </FormErrorMessage>
            </FormControl>
        );
    }

    const handleSend = async (values) => {
        values.feelingsUids = [];

        for (let i = 0; i < selectedFeelings.length; i++) {
            const f = selectedFeelings[i];

            values.feelingsUids.push(f.value);
        }

        values.type = type;

        values.authorUid = user.uid;

        values.selectedFile = selectedFile;

        if (type == "pintura" || type == "fotografia") {
            // Imgur handling

            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/imgur/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json()).then(data => {
                values.url = data.url;
                values.selectedFile = null;
            });
        }

        else if (type == "escultura") {
            // check type
            return;
        }

        else if (type == "música" || type == "áudio") {
            // storage thingy

            const extension = values.selectedFile.name.slice((values.selectedFile.name.lastIndexOf(".") - 1 >>> 0) + 2);

            var buf = new Buffer.from(await values.selectedFile.arrayBuffer());

            var data = new FormData();
            data.append("category", type == "música" ? "music" : "audio");
            data.append("file", JSON.stringify(buf));
            data.append("type", values.selectedFile.type);
            data.append("extension", extension);

            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/audio/new`, {
                method: "POST",
                body: data
            }).then(res => res.json()).then(data => {
                // values.url = data.url;
                values.selectedFile = null;
            });

            return;
        }

        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/new`, {
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

    const fileDrop = (files, rejectedFiles) => {
        if (rejectedFiles.length !== 0) {
            alert("arquivo grande demais, verifique o tamanho permitido");

            return;
        }

        const file = files[0];

        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = socorro => {

            fileElement = (<li key={file.path}>
                {file.path} - {bytes(file.size, { unitSeparator: " " })}
            </li>);

            if (file.type === "audio/mpeg") {
                setSelectedFile(file);
            }

            else {
                setSelectedFile(socorro.target.result.split(',')[1]);
            }

            // YEAH
            // This is a really bad solution
            // SO WHAT
            caguei(updatedType)
        };
    }

    const caguei = type => {
        switch (type) {
            case "pintura":
            case "fotografia":
                buildDropzone("image/jpeg, image/png", ".jpeg ou .png", "20mb");
                break;
            case "escultura":
                buildDropzone("image/jpeg, image/png, video/mp4", ".jpeg, .png e .mp4", "7kb");
                break;
            case "video":
                buildDropzone("video/mp4", ".mp4", "100mb");
                break;
            case "música":
            case "áudio":
                buildDropzone("audio/mpeg", ".mp1, .mp2 e .mp3", "50mb");
                break;
        }
    }

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