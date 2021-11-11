import dynamic from 'next/dynamic'

const NewPost = dynamic(() => import('./components/new_post'), {
  ssr: false
})

export async function getServerSideProps() {
    var props = {};

    const typeOptions = [
        "poesia",
        "pintura",
        "escultura",
        "fotografia",
        "vídeo",
        "texto",
        "música",
        "áudio"
    ];

    var res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/feelings/fetch`, {
        method: "GET"
    });
    const feelings = await res.json();

    props.feelings = feelings.feelings;
    props.typeOptions = typeOptions;

    return { props: { props } };
}

export default function Home({ props }) {
    return (
        <div>
            <NewPost {...props}></NewPost>
        </div>
    );
};