import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, InputNumber } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { IFilament } from "../filaments/model";

interface CreateOrCloneProps {
  mode: "create" | "clone";
}

export const SpoolCreate: React.FC<
  IResourceComponentsProps & CreateOrCloneProps
> = (props) => {
  const { formProps, saveButtonProps, formLoading } = useForm();

  if (props.mode === "clone" && formProps.initialValues) {
    // Clear out the values that we don't want to clone
    formProps.initialValues.first_used = null;
    formProps.initialValues.last_used = null;
    formProps.initialValues.used_weight = 0;

    // Fix the filament_id
    formProps.initialValues.filament_id = formProps.initialValues.filament.id;
  }

  const { queryResult } = useSelect<IFilament>({
    resource: "filament",
  });

  const filamentOptions = queryResult.data?.data.map((item) => {
    let label;
    if (item.vendor) {
      label = `${item.vendor.name} - ${item.name}`;
    } else {
      label = item.name;
    }

    return {
      label: label,
      value: item.id,
    };
  });

  return (
    <Create
      title={props.mode === "create" ? "Create Spool" : "Clone Spool"}
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="First Used"
          name={["first_used"]}
          rules={[
            {
              required: false,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="Last Used"
          name={["last_used"]}
          rules={[
            {
              required: false,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="Filament"
          name={["filament_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={filamentOptions} />
        </Form.Item>
        <Form.Item
          label="Used Weight"
          name={["used_weight"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={0} addonAfter="g" precision={0} />
        </Form.Item>
        <Form.Item
          label="Location"
          name={["location"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          label="Lot Nr"
          name={["lot_nr"]}
          rules={[
            {
              required: false,
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
