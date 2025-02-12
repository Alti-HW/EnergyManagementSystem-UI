import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Chip from '@mui/material/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RoleMap(props: any) {
  const {
    roles = [],
    userSelectedRoles = [],
    onRoleChange,
    multiple = false, // Default is true (multiple selection)
    newMode = false
  } = props;

  const [selectedRoles, setSelectedRoles] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (newMode) {
      return
    }
    if (multiple) {
      const selectedOptions = roles.filter((role: any) =>
        userSelectedRoles.some((selectedRole: any) => selectedRole.id === role.id)
      );
      setSelectedRoles(selectedOptions);
    } else {
      const selectedOptions = roles.filter((role: any) =>
        userSelectedRoles[0]?.id === role?.id
      );
      // If not multiple, assume userSelectedRoles is a single object
      setSelectedRoles(selectedOptions?.length > 0 ? selectedOptions[0] : []);
    }
  }, [userSelectedRoles, roles, multiple]);

  const handleChange = (event: any, newSelectedRoles: any) => {
    if (multiple) {
      setSelectedRoles(!newSelectedRoles ? [] : newSelectedRoles);
      const newlySelected = newSelectedRoles.filter(
        (newRole: any) =>
          !userSelectedRoles.find((oldRole: any) => oldRole?.id === newRole?.id)
      );

      const untickedRoles = userSelectedRoles.filter(
        (oldRole: any) =>
          !newSelectedRoles.find((newRole: any) => newRole?.id === oldRole?.id)
      );

      if (onRoleChange) {
        onRoleChange({ newlySelected, untickedRoles });
      }
    } else {
      setSelectedRoles(!newSelectedRoles ? {} : newSelectedRoles);
      const newlySelected = newSelectedRoles
        ? [newSelectedRoles] // Wrap in an array for consistency
        : [];

      const untickedRoles = newSelectedRoles?.id !== userSelectedRoles[0]?.id
        ? userSelectedRoles.length === 1 ? [userSelectedRoles[0]] : [] // If userSelectedRoles is not empty, consider it
        : [];

      if (onRoleChange) {
        onRoleChange({ newlySelected, untickedRoles });
      }
    }
  };

  return (
    <Autocomplete
      fullWidth
      id="checkboxes-tags-demo"
      options={roles}
      disableCloseOnSelect={multiple}
      value={selectedRoles}
      onChange={handleChange}
      getOptionLabel={(option: any) => option?.name || ""}
      multiple={multiple}
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props} key={option.id}>
            {multiple &&
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            }
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Roles"
          placeholder="Select roles"
          variant="outlined"
        />
      )}
      renderTags={(value: any, getTagProps: any) => {
        return value.map((option: any, index: number) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            key={option.id}
            color="primary"
          />
        ));
      }}
    />
  );
}
