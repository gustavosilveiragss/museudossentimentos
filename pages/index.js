import Feed from "./components/feed"

export async function getStaticProps() {
    var props = {};

    props.feelings = new Array();

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

    return { props: { props } };
}

export default function Home({ props }) {
    return (
        <Feed {...props}></Feed>
    );
};