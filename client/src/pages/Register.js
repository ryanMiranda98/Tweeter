import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  // "Function" gets hoisted
  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Enter Username"
          type="text"
          placeholder="eg: JohnDoe"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Enter Email"
          type="email"
          placeholder="eg: johndoe@gmail.com"
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Enter Password"
          type="password"
          placeholder="eg: 12345678"
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          placeholder="eg: 12345678"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
