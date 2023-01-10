import React from "react";
import { useRecordContext } from "react-admin";

export const TimeField = ({ source }) => {
  const record = useRecordContext();

  if (record) {
    let time = new Date(record[source]);
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return <span style={{ color: "purple" }}>{record && record[source]}</span>;
  }
};
