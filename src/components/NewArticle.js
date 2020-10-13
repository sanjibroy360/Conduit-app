import React from "react";
import { useHistory } from "react-router-dom";
import InputBox from "./InputBox";
import axios from "axios";
import { Formik } from "formik";
import { Button, Form, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
// import MDEditor from "@uiw/react-md-editor";
// import MEDitor from "@uiw/react-md-editor";
import TextArea from "./TextArea";

function NewArticle() {
  let history = useHistory();
  return (
    <div className="create_article_form">
      <Segment>
        <Formik
          initialValues={{ title: "", description: "", body: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required";
            }
            if (!values.description) {
              errors.email = "Description is required";
            }

            if (!values.body) {
              errors.email = "Body is required";
            }
            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(
                "/articles",
                {
                  article: values,
                },
                {
                  headers: {
                    authorization: `Token ${localStorage.authToken}`,
                  },
                }
              )
              .then(({ data: { user } }) => {
                toast.success(`Article published successfuly`);
                return history.push("/");
              })
              .catch((error) => {
                toast.error("Something went wrong!");

                return setSubmitting(false);
              });
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
                name="title"
                label="Title"
                value={values.title}
                handleInput={handleChange}
                errorMessage={errors.title}
              />

              <InputBox
                name="description"
                type="text"
                label="Description"
                value={values.description}
                handleInput={handleChange}
                errorMessage={errors.description}
              />
              <TextArea
                name="body"
                label="Content"
                value={values.body}
                handleInput={handleChange}
                errorMessage={errors.address}
              />

              <div className="publish_btn_wrapper">
                {isSubmitting ? (
                  <Button loading positive fluid>
                    Loading
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    positive
                    size="large"
                    primary
                    className={
                      (!isValid ||
                        !values.body ||
                        !values.title ||
                        !values.description) &&
                      "disable_btn"
                    }
                    disabled={
                      !isValid ||
                      !values.body ||
                      !values.title ||
                      !values.description
                    }
                  >
                    <Button.Content visible>Publish</Button.Content>
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

export default NewArticle;
