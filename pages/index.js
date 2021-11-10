import NavBar from "./components/navbar"
import dynamic from 'next/dynamic'

const Feed = dynamic(() => import('./components/feed'), {
  ssr: false
})

export async function getStaticProps() {
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

    res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/fetch`, {
        method: "GET"
    });
    const posts = await res.json();

    props.feelings = feelings.feelings;
    props.posts = posts.posts;
    props.typeOptions = typeOptions;

    return { props: { props } };
}

export default function Home({ props }) {
    return (
        <div>
            <NavBar></NavBar>
            {/*<NewPost {...props}></NewPost>*/}
            <Feed {...props}></Feed>
        </div>
    );
};