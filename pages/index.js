import NewPost from "./components/new_post"

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

export default function Home( { props } ) {
    return (
        <NewPost {...props}>

        </NewPost>
    );
};