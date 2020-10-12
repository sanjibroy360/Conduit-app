import React,{useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form, Segment } from "semantic-ui-react";
import InputBox from "./InputBox";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

function Login({ setIsLoggedIn }) {
  let history = useHistory();
  let context = useContext(UserContext);
  let [passwordPreview, setPasswordPreview] = useState(false);

  return (
    <div className="form_wrapper">
      <Segment>
        <h2 className="form_heading">Log In</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Password is required";
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("/users/login", {
                user: values,
              })
              .then(({ data: { user } }) => {
                localStorage.setItem("authToken", user.token);
                setIsLoggedIn(true);
                setSubmitting(false);
                context.setUserInfo(user);
                toast.success(`${user.username} is logged in sucessfuly.`);
                return history.push("/");
              })
              .catch((error) => {
                let statusCode = error.response.status;
                if (statusCode === 422) {
                  toast.error("Incorrect email or password");
                } else {
                  toast.error("Something went wrong!");
                }

                return setSubmitting(false);
              })
            
              
          }}
        >
          {({
            dirty,
            isValid,
            values,
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
                name={"email"}
                label={"Email"}
                value={values.email}
                handleInput={handleChange}
                errorMessage={errors.email}
              />

              <p onClick={()=> setPasswordPreview(!passwordPreview)}>icon</p>

              <InputBox
                name={"password"}
                type={passwordPreview? "text": "password"}
                label={"Password"}
                value={values.password}
                handleInput={handleChange}
                errorMessage={errors.password}
              />

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
                    disabled={(!isValid || !values.email || !values.password)}
                    
                  >
                    <Button.Content visible>Log In</Button.Content>
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

export default Login;
