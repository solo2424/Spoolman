import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

interface CreateOrCloneProps {
  mode: "create" | "clone";
}

export const VendorCreate: React.FC<
  IResourceComponentsProps & CreateOrCloneProps
> = (props) => {
  const { formProps, saveButtonProps, formLoading } = useForm();

  return (
    <Create
      title={props.mode === "create" ? "Create Vendor" : "Clone Vendor"}
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          label="Comment"
          name={["comment"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea maxLength={1024} />
        </Form.Item>
      </Form>
    </Create>
  );
};
