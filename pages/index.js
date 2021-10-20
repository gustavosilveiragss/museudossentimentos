import NewPost from "./components/new_post"
import Player from "./components/player"

export async function getStaticProps() {
    var props = {};

    props.feelings = new Array();

    var res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/feelings/fetch`, {
        method: "GET"
    });
    var data = await res.json();

    props.feelings = data.feelings;

    return { props: { props } };
}

export default function Home({ props }) {
    return (
        <div>
            <NewPost {...props}>
            </NewPost>
            <Player {...props}></Player>
        </div>
    );
};