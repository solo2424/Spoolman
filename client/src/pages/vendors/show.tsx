import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, DateField, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const { Title } = Typography;

export const VendorShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Registered</Title>
      <DateField
        value={dayjs.utc(record?.registered).local()}
        title={dayjs.utc(record?.registered).local().format()}
        format="YYYY-MM-DD HH:mm:ss"
      />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Comment</Title>
      <TextField value={record?.comment} />
    </Show>
  );
};
