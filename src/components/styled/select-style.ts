// import styles from "../../../components/table/main-table-styles";

import { colors } from "react-select/src/theme";

export const selectSearchStyle = {
  container: (styles: any) => ({ ...styles, height: "47px" }),
  input: (styles: any) => ({
    ...styles,
    ":focus": {
      borderColor: "transparent",
    },
    color: "#333333",
    fontSize: "16px",
    fontWeight: "500",
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#B3B3B3",
    fontSize: "16px",
    fontWeight: "500",
  }),
  control: (styles: any) => ({
    ...styles,
    height: "100%",
    background: "transparent",
    borderColor: "transparent",
    ":hover": {
      borderColor: "transparent",
    },
    ":focus": {
      borderColor: "transparent",
    },
    boxShadow: "0 0 0 0 transparent",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#333333",
    fontSize: "16px",
    fontWeight: "500",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#333333",
    fontSize: "30px",
    cursor: "pointer",
    position: "relative",
    ":hover": {
      color: "#333333",
    },
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
};
