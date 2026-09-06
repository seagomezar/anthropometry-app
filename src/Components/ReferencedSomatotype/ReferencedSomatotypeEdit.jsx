import React from "react";
import { Edit } from "react-admin";
import { ReferencedSomatotypeForm } from "./ReferencedSomatotypeForm";

export const ReferencedSomatotypeEdit = (props) => {
  return (
    <Edit {...props} component="div" sx={{ '& .RaEdit-card': { boxShadow: 'none', backgroundColor: 'transparent' } }}>
      <ReferencedSomatotypeForm />
    </Edit>
  );
};
