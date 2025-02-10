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
    roles = [], // List of all available roles
    userSelectedRoles = [], // List of roles already selected for the user
    onRoleChange,
  } = props;

  // Sync selected roles with the parent data
  const [selectedRoles, setSelectedRoles] = React.useState(userSelectedRoles);

  React.useEffect(() => {
    setSelectedRoles(userSelectedRoles); // Sync selected roles whenever they change in the parent
  }, [userSelectedRoles]);

  const handleChange = (event: any, newSelectedRoles: any) => {
    // When the user selects or unselects a role, update the state and notify the parent
    setSelectedRoles(newSelectedRoles);

    // Identify newly selected and unselected roles
    const newlySelected = newSelectedRoles.filter(
      (newRole: any) =>
        !userSelectedRoles.find((oldRole: any) => oldRole.id === newRole.id)
    );

    const untickedRoles = selectedRoles.filter(
      (oldRole: any) =>
        !newSelectedRoles.find((newRole: any) => newRole.id === oldRole.id)
    );

    // Notify the parent with the selected roles
    if (onRoleChange) {
      onRoleChange({ newlySelected, untickedRoles });
    }
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={roles} // All available roles
      disableCloseOnSelect
      value={selectedRoles} // Display selected roles as chips in the TextField
      onChange={handleChange} // Handle changes when selecting/unselecting roles
      getOptionLabel={(option: any) => option.name} // Display name of each role
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props} key={option.id}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected} // Checkbox will be checked if selected
            />
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
        // Render selected roles as chips
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
