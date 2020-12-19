import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { Fragment } from "react";
import {
  Grid,
  Loader,
  Card,
  Label,
  Icon,
  Image,
  Header,
} from "semantic-ui-react";
import moment from "moment";

const UserPage = (props) => {
  const username = props.match.params.username;

  const { data } = useQuery(GET_USER_POSTS, {
    variables: {
      username,
    },
  });

  const { data: userData } = useQuery(GET_USER_INFO, {
    variables: { username },
  });

  let userMarker;
  if (!userData) {
    userMarker = <Loader active />;
  } else {
    const { email, createdAt } = userData.getUser;
    const joinDate = createdAt.slice(0, 10);
    userMarker = (
      <Fragment>
        <Grid.Row>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            size="medium"
          />
        </Grid.Row>
        <Grid.Row>
          <Header as="h1">{username}</Header>
        </Grid.Row>
        <Grid.Row>
          <Header as="h3">{email}</Header>
        </Grid.Row>
        <Grid.Row>
          <Header as="h4">Joined on: {joinDate}</Header>
        </Grid.Row>
      </Fragment>
    );
  }

  let postMarker;
  if (!data) {
    postMarker = <Loader active />;
  } else {
    const postsArray = data.getPostsByUser;

    postMarker = (
      <Grid centered>
        {userMarker}
        <Grid.Row>
          <Grid.Column width={12}>
            {postsArray.map((post) => (
              <Card fluid key={post.id}>
                <Card.Content>
                  <Card.Description>{post.body}</Card.Description>
                  <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui">
                    <Card.Meta>
                      <Icon name="heart" />
                      <Label>{post.likeCount}</Label>
                    </Card.Meta>
                    <Card.Meta>
                      <Icon name="comments" />
                      <Label>{post.commentCount}</Label>
                    </Card.Meta>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarker;
};

const GET_USER_POSTS = gql`
  query getPostsByUser($username: String!) {
    getPostsByUser(username: $username) {
      id
      body
      likeCount
      commentCount
      createdAt
    }
  }
`;

const GET_USER_INFO = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      email
      createdAt
    }
  }
`;

export default UserPage;
