import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  SelectField,
  useTranslate,
  EditButton,
  DeleteButton,
  TextInput,
  SimpleList,
  useListContext,
} from "react-admin";
import { useMediaQuery, Box, Typography, Paper, Chip } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

const ReferencedSomatotypeFilters = [
  <TextInput
    key="search"
    label="Search"
    source="sport@_like"
    alwaysOn
    sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#fcf9f4",
        borderRadius: "2px",
        fontFamily: "'Inter', sans-serif",
        "& fieldset": {
          borderColor: "rgba(3, 37, 23, 0.25)",
        },
        "&:hover fieldset": {
          borderColor: "#1b3b2b",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#c29b38",
        },
      },
    }}
  />,
];

const ReferencedSomatotypeListHeader = () => {
  const translate = useTranslate();
  const { total, data } = useListContext();
  const count = total !== undefined ? total : (data ? Object.keys(data).length : 0);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.5 },
        mb: 2.5,
        backgroundColor: "#faf7f2",
        border: "1px solid rgba(3, 37, 23, 0.18)",
        borderTop: "4px solid #1b3b2b",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#1b3b2b",
            color: "#fed269",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #c29b38",
          }}
        >
          <TimelineIcon fontSize="small" />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              color: "#032517",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {translate("referenced_somatotype_list.title", {
              _: "Catálogo de Somatotipos de Referencia",
            })}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: "#424843",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "11px",
              display: "block",
              mt: 0.3,
            }}
          >
            {translate("referenced_somatotype_list.subtitle", {
              _: "Perfiles Morfométricos Canónicos por Disciplina Deportiva & Género",
            })}
          </Typography>
        </Box>
      </Box>

      <Chip
        label={translate("referenced_somatotype_list.catalog_count", {
          count,
          _: `Perfiles Catalogados: ${count}`,
        })}
        size="small"
        sx={{
          backgroundColor: "rgba(194, 155, 56, 0.15)",
          color: "#775a00",
          border: "1px solid rgba(194, 155, 56, 0.4)",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "12px",
          px: 1,
          py: 0.5,
          borderRadius: "2px",
        }}
      />
    </Paper>
  );
};

const ReferencedSomatotypeListLedgerFooter = () => {
  const translate = useTranslate();
  const { total, data } = useListContext();
  const count = total !== undefined ? total : (data ? Object.keys(data).length : 0);

  return (
    <Box
      sx={{
        px: 2.5,
        py: 1.5,
        backgroundColor: "#faf7f2",
        borderTop: "2px solid #c29b38",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: "13.5px",
          color: "#424843",
          letterSpacing: "0.02em",
        }}
      >
        {translate("referenced_somatotype_list.ledger_folio", {
          _: "Catálogo Canónico Internacional • Somatotipos de Élite",
        })}
      </Typography>
      <Chip
        label={translate("referenced_somatotype_list.active_entries", {
          count,
          _: `Perfiles Canónicos: ${count}`,
        })}
        size="small"
        sx={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "11.5px",
          backgroundColor: "#fff",
          border: "1px solid rgba(27, 59, 43, 0.3)",
          color: "#032517",
          borderRadius: "2px",
        }}
      />
    </Box>
  );
};

export const ReferencedSomatotypeList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const translate = useTranslate();

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <List filters={ReferencedSomatotypeFilters} component="div">
        <ReferencedSomatotypeListHeader />
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.sport}
            secondaryText={(record) =>
              `${record.gender ? translate("myroot.male") : translate("myroot.female")} • Endo: ${record.endomorph || 0}, Meso: ${record.mesomorph || 0}, Ecto: ${record.ectomorph || 0}`
            }
            tertiaryText={(record) => (
              <DateField record={record} source="created_at" />
            )}
            rowStyle={() => ({
              backgroundColor: "#fcf9f4",
              border: "1px solid rgba(3, 37, 23, 0.18)",
              borderLeft: "4px solid #1b3b2b",
              borderRadius: "2px",
              margin: "8px 0",
              padding: "10px 12px",
            })}
            linkType="show"
          />
        ) : (
          <Paper
            elevation={0}
            sx={{
              border: "3px double #1b3b2b",
              borderRadius: "2px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(27, 59, 43, 0.08)",
            }}
          >
            <Datagrid
              rowClick="show"
              sx={{
                boxShadow: "none",
                "& .MuiTableCell-head": {
                  fontWeight: 700,
                  backgroundColor: "#1b3b2b",
                  color: "#fcf9f4",
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "14.5px",
                  letterSpacing: "0.05em",
                  borderBottom: "2px solid #c29b38",
                  borderRight: "1px solid rgba(252, 249, 244, 0.12)",
                  padding: "12px 14px",
                  textTransform: "uppercase",
                  "& .MuiTableSortLabel-root": {
                    color: "#fcf9f4 !important",
                    "& .MuiTableSortLabel-icon": {
                      color: "#fed269 !important",
                    },
                  },
                },
                "& .MuiTableCell-body": {
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1c1c19",
                  padding: "10px 14px",
                  borderBottom: "1px solid rgba(27, 59, 43, 0.09)",
                  borderRight: "1px solid rgba(27, 59, 43, 0.05)",
                  verticalAlign: "middle",
                },
                "& .MuiTableRow-root:hover": {
                  backgroundColor: "rgba(245, 239, 230, 0.95) !important",
                  borderLeft: "4px solid #c29b38",
                },
                "& .MuiTableRow-root:nth-of-type(even)": {
                  backgroundColor: "#faf7f2",
                },
                "& .column-id span": {
                  display: "inline-block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "12px",
                  backgroundColor: "#fcf9f4",
                  border: "1px solid #1b3b2b",
                  boxShadow: "1px 1px 0px rgba(27, 59, 43, 0.7)",
                  px: 0.8,
                  py: 0.2,
                  borderRadius: "1px",
                  color: "#032517",
                },
                "& .column-gender span": {
                  display: "inline-block",
                  px: 1,
                  py: 0.2,
                  borderRadius: "1px",
                  fontSize: "11px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  border: "1px solid rgba(194, 155, 56, 0.5)",
                  backgroundColor: "rgba(194, 155, 56, 0.12)",
                  color: "#775a00",
                },
                "& .column-endomorph, & .column-mesomorph, & .column-ectomorph": {
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: "#032517",
                },
                "& .column-x span, & .column-y span": {
                  display: "inline-block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: "#1b3b2b",
                  backgroundColor: "rgba(27, 59, 43, 0.08)",
                  border: "1px solid rgba(27, 59, 43, 0.2)",
                  px: 0.8,
                  py: 0.2,
                  borderRadius: "1px",
                },
                "& .column-created_at, & .column-updated_at": {
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12.5px",
                  color: "#424843",
                },
              }}
            >
              <TextField source="id" />
              <TextField source="sport" />
              <SelectField
                source="gender"
                choices={[
                  { id: true, name: translate("myroot.male") },
                  { id: false, name: translate("myroot.female") },
                ]}
              />
              <NumberField source="endomorph" />
              <NumberField source="mesomorph" />
              <NumberField source="ectomorph" />
              <NumberField source="x" />
              <NumberField source="y" />
              <DateField source="updated_at" />
              <DateField source="created_at" />
              <EditButton />
              <DeleteButton />
            </Datagrid>
            <ReferencedSomatotypeListLedgerFooter />
          </Paper>
        )}
      </List>
    </Box>
  );
};

