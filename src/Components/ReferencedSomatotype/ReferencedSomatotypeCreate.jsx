import React from "react";
import { Create } from "react-admin";
import { ReferencedSomatotypeForm } from "./ReferencedSomatotypeForm";

export const ReferencedSomatotypeCreate = (props) => {
  return (
    <Create {...props} component="div" sx={{ '& .RaCreate-card': { boxShadow: 'none', backgroundColor: 'transparent' } }}>
      <ReferencedSomatotypeForm />
    </Create>
  );
};
