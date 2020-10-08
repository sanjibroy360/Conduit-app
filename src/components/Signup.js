import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import InputBox from "./InputBox";
import validateForm from "../utils/validateForm";
import axios from "axios";
import { toast } from "react-toastify";

function Signup({ setIsLoggedIn }) {
  let history = useHistory();
  let passwordRequirement = [
    "Password should contain at-least one uppercase and one lowercase letter",
    "Password should contain at-least one number",
    "Password should contain at-least one character",
  ];

  return (
    <div className="form_wrapper">
      <Segment>
        <h2 className="form_heading">Sign Up</h2>
        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          validate={(values) => validateForm(values)}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("/users", {
                user: values,
              })
              .then(({ data: { user } }) => {
                localStorage.setItem("authToken", user.token);
                setIsLoggedIn(true);
                toast.success(
                  `${user.username} account has been created successfuly`
                );
                toast.success(`${user.username} is logged in sucessfuly.`);
                return history.push("/home");
              })
              .catch((error) => toast.error("Something went wrong!"));
          }}
        >
          {({
            values,
            isValid,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form>
              <InputBox
                name={"username"}
                label={"Username"}
                value={values.username}
                handleInput={handleChange}
                errorMessage={errors.username}
              />

              <InputBox
                name={"email"}
                label={"Email"}
                value={values.email}
                handleInput={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.email}
              />

              <InputBox
                name={"password"}
                type="password"
                label={"Password"}
                value={values.password}
                handleInput={handleChange}
                errorMessage={errors.password}
              />
              {
                <Message>
                  <Message.List>
                    {passwordRequirement.map((error) => (
                      <Message.Item key={error}>{error}</Message.Item>
                    ))}
                  </Message.List>
                </Message>
              }

              <div className="btn_wrapper">
                {isSubmitting ? (
                  <Button loading positive fluid>
                    Loading
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    positive
                    fluid
                    size="large"
                    primary
                    disabled={!isValid}
                  >
                    <Button.Content visible>Sign Up</Button.Content>
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Segment>
    </div>
  );
}

export default Signup;
