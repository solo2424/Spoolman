import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, DateField, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { NumberFieldUnit } from "../../components/numberField";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const { Title } = Typography;

export const FilamentShow: React.FC<IResourceComponentsProps> = () => {
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
      <Title level={5}>Vendor</Title>
      {/* {vendorIsLoading ? <>Loading...</> : <>{vendorData?.data?.id}</>} */}
      <Title level={5}>Color</Title>
      <TextField value={record?.color_hex} />
      <Title level={5}>Material</Title>
      <TextField value={record?.material} />
      <Title level={5}>Price</Title>
      <NumberField value={record?.price ?? ""} />
      <Title level={5}>Density</Title>
      <NumberFieldUnit
        value={record?.density ?? ""}
        unit="g/cm³"
        options={{
          maximumFractionDigits: 2,
        }}
      />
      <Title level={5}>Diameter</Title>
      <NumberFieldUnit
        value={record?.diameter ?? ""}
        unit="mm"
        options={{
          maximumFractionDigits: 2,
        }}
      />
      <Title level={5}>Weight</Title>
      <NumberFieldUnit
        value={record?.weight ?? ""}
        unit="g"
        options={{
          maximumFractionDigits: 1,
        }}
      />
      <Title level={5}>Spool Weight</Title>
      <NumberFieldUnit
        value={record?.spool_weight ?? ""}
        unit="g"
        options={{
          maximumFractionDigits: 1,
        }}
      />
      <Title level={5}>Overridden Extruder Temperature</Title>
      {!record?.settings_extruder_temp ? (
        <TextField value="Not Set" />
      ) : (
        <NumberFieldUnit
          value={record?.settings_extruder_temp ?? ""}
          unit="°C"
        />
      )}
      <Title level={5}>Overridden Bed Temperature</Title>
      {!record?.settings_bed_temp ? (
        <TextField value="Not Set" />
      ) : (
        <NumberFieldUnit value={record?.settings_bed_temp ?? ""} unit="°C" />
      )}
      <Title level={5}>Article Number</Title>
      <TextField value={record?.article_number} />
      <Title level={5}>Comment</Title>
      <TextField value={record?.comment} />
    </Show>
  );
};
