import gql from "graphql-tag";
import React, { Fragment } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      data.posts = [result.data.createPost, ...data.posts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hello World!"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>

      {error && (
        <div className="ui error message" style={{marginBottom: 20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
