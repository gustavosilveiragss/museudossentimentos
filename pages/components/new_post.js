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
    Input,
    Select,
    Option
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import RadioCard from "./radio_card"
import useAuth from "../../hooks/useAuth";

// send this to the db
const feelings = [
    { label: "aceitação" },
    { label: "admiração" },
    { label: "adoração" },
    { label: "afeição" },
    { label: "afeto" },
    { label: "agrado" },
    { label: "alegria" },
    { label: "alento" },
    { label: "alívio" },
    { label: "ambição" },
    { label: "amor" },
    { label: "animação" },
    { label: "ânimo" },
    { label: "apego" },
    { label: "apreciação" },
    { label: "ardor" },
    { label: "arrebatamento" },
    { label: "assombro" },
    { label: "atração" },
    { label: "bem-estar" },
    { label: "bom humor" },
    { label: "bondade" },
    { label: "brio" },
    { label: "calma" },
    { label: "carinho" },
    { label: "carisma" },
    { label: "certeza" },
    { label: "comoção" },
    { label: "compaixão" },
    { label: "complacência" },
    { label: "completude" },
    { label: "compreensão" },
    { label: "comprometimento" },
    { label: "confiança" },
    { label: "conforto" },
    { label: "consideração" },
    { label: "contentamento" },
    { label: "convicção" },
    { label: "coragem" },
    { label: "crença" },
    { label: "curiosidade" },
    { label: "desejo" },
    { label: "despreocupação" },
    { label: "deslumbramento" },
    { label: "desvelo" },
    { label: "determinação" },
    { label: "devoção" },
    { label: "dignidade" },
    { label: "disposição" },
    { label: "diversão" },
    { label: "efusão" },
    { label: "emoção" },
    { label: "empatia" },
    { label: "empolgação" },
    { label: "encantamento" },
    { label: "entusiasmo" },
    { label: "equilíbrio" },
    { label: "espanto" },
    { label: "esperança" },
    { label: "euforia" },
    { label: "excitação" },
    { label: "êxtase" },
    { label: "fascínio" },
    { label: "fé" },
    { label: "felicidade" },
    { label: "força" },
    { label: "generosidade" },
    { label: "gentileza" },
    { label: "gratidão" },
    { label: "honra" },
    { label: "independência" },
    { label: "interesse" },
    { label: "inspiração" },
    { label: "júbilo" },
    { label: "liberdade" },
    { label: "motivação" },
    { label: "orgulho" },
    { label: "otimismo" },
    { label: "paciência" },
    { label: "paixão" },
    { label: "paz" },
    { label: "piedade" },
    { label: "plenitude" },
    { label: "poder" },
    { label: "prazer" },
    { label: "proteção" },
    { label: "pudor" },
    { label: "realização" },
    { label: "relaxamento" },
    { label: "resiliência" },
    { label: "respeito" },
    { label: "responsabilidade" },
    { label: "satisfação" },
    { label: "segurança" },
    { label: "serenidade" },
    { label: "simpatia" },
    { label: "solidariedade" },
    { label: "surpresa" },
    { label: "tenacidade" },
    { label: "ternura" },
    { label: "tolerância" },
    { label: "tranquilidade" },
    { label: "triunfo" },
    { label: "vaidade" },
    { label: "valentia" },
    { label: "vivacidade" },
    { label: "zelo" },
    { label: "agonia" },
    { label: "alarme" },
    { label: "amargura" },
    { label: "angústia" },
    { label: "ânsia" },
    { label: "ansiedade" },
    { label: "antipatia" },
    { label: "apatia" },
    { label: "apreensão" },
    { label: "arrependimento" },
    { label: "aversão" },
    { label: "carência" },
    { label: "choque" },
    { label: "ciúme" },
    { label: "cólera" },
    { label: "confusão" },
    { label: "consternação" },
    { label: "constrangimento" },
    { label: "covardia" },
    { label: "culpa" },
    { label: "decepção" },
    { label: "depressão" },
    { label: "derrota" },
    { label: "desânimo" },
    { label: "desapego" },
    { label: "desapontamento" },
    { label: "desconfiança" },
    { label: "desconforto" },
    { label: "desconsolo" },
    { label: "descrença" },
    { label: "desencanto" },
    { label: "desespero" },
    { label: "desgosto" },
    { label: "desilusão" },
    { label: "desinteresse" },
    { label: "desorientação" },
    { label: "dó" },
    { label: "dor" },
    { label: "dúvida" },
    { label: "egoísmo" },
    { label: "embaraço" },
    { label: "enfado" },
    { label: "estresse" },
    { label: "frustração" },
    { label: "fúria" },
    { label: "hesitação" },
    { label: "histeria" },
    { label: "horror" },
    { label: "hostilidade" },
    { label: "humilhação" },
    { label: "impaciência" },
    { label: "incômodo" },
    { label: "incredulidade" },
    { label: "indecisão" },
    { label: "indiferença" },
    { label: "indignação" },
    { label: "infelicidade" },
    { label: "ingratidão" },
    { label: "inibição" },
    { label: "inquietação" },
    { label: "insatisfação" },
    { label: "insegurança" },
    { label: "inveja" },
    { label: "ira" },
    { label: "irritação" },
    { label: "letargia" },
    { label: "loucura" },
    { label: "luto" },
    { label: "mágoa" },
    { label: "mau humor" },
    { label: "medo" },
    { label: "melancolia" },
    { label: "nervosismo" },
    { label: "nojo" },
    { label: "nostalgia" },
    { label: "ódio" },
    { label: "pânico" },
    { label: "pavor" },
    { label: "pena" },
    { label: "perda" },
    { label: "perturbação" },
    { label: "pesar" },
    { label: "pessimismo" },
    { label: "posse" },
    { label: "preconceito" },
    { label: "preocupação" },
    { label: "raiva" },
    { label: "rancor" },
    { label: "receio" },
    { label: "remorso" },
    { label: "repulsa" },
    { label: "ressentimento" },
    { label: "revolta" },
    { label: "saturação" },
    { label: "saudade" },
    { label: "sofrimento" },
    { label: "solidão" },
    { label: "tédio" },
    { label: "temor" },
    { label: "tensão" },
    { label: "terror" },
    { label: "torpor" },
    { label: "tristeza" },
    { label: "vergonha" },
    { label: "vulnerabilidade" },
    { label: "zanga" },
];

const NewPost = () => {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();

    // TODO: change this to an enum
    const type_options = ["poesia", "pintura", "escultura", "fotografia", "video", "texto", "outro"]

    const [type, setType] = useState("poesia");

    const [mediaComponent, setMediaComponent] = useState();

    const { user } = useAuth();

    const [pickerFeelings, setPickerFeelings] = useState(feelings);
    const [selectedFeelings, setSelectedFeelings] = useState(new Array());

    const handleCreateItem = (item) => {
        setPickerFeelings((curr) => [...curr, item]);
        setSelectedFeelings((curr) => [...curr, item]);
        // register on db
    };

    const handleSelectedItemsChange = (changes) => {
        setSelectedFeelings(changes.selectedItems);
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
                            onCreateItem={handleCreateItem}
                            items={pickerFeelings}
                            selectedItems={selectedFeelings}
                            hideToggleButton={true}
                            onSelectedItemsChange={(changes) =>
                                handleSelectedItemsChange(changes)
                            }
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