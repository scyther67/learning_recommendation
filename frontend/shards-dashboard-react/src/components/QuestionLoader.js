import LoadingOverlay from "react-loading-overlay";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export default function QuestionLoader({ active, children }) {
  return (
    <LoadingOverlay active={true} spinner={<CircularProgress />}>
      {children}
    </LoadingOverlay>
  );
}
