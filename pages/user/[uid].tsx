import React, { ReactNode } from 'react';
import {
  VStack
} from '@chakra-ui/react';
import Feed from '../components/feed';
import NavBar from '../components/navbar';

AuthorProfile.getInitialProps = async ({ query }) => {
  const { uid } = query;

  var userRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${uid}`, {
    method: "GET"
  });
  var user = (await userRes.json()).user;

  var postsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/author/${user.uid}?`
    + new URLSearchParams({
      user: JSON.stringify(user)
    }), {
    method: "GET"
  });
  user.posts = (await postsRes.json()).posts;

  var res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/feelings/fetch`, {
    method: "GET"
  });
  const feelings = await res.json();

  var props = {
    feelings: feelings.feelings,
    posts: user.posts,
    typeOptions: [
      "poesia",
      "pintura",
      "escultura",
      "fotografia",
      "vídeo",
      "texto",
      "música",
      "áudio"
    ],
    userProfile: user,
    author: user
  };

  return {
    props: props,
  };
}

function AuthorProfile({
  children,
  props,
}: {
  children: ReactNode,
  props: any
}) {
  return (
    <div>
      <NavBar></NavBar>
      <Feed {...props}></Feed>
    </div>
  );
}

export default AuthorProfile;
