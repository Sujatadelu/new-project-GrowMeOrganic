
import { useState } from 'react';
import { Checkbox, IconButton, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments?: Department[];
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Agriculture & Fishing',
    subDepartments: [
      { id: 2, name: 'Agriculture' },
      { id: 3, name: 'Crops' },
      { id: 4, name: 'Farming Animals & Livestock' },
      { id: 5, name: 'Fishery & Aquaculture' },
      { id: 6, name: 'Ranching' },
    ],
  },
  {
    id: 7,
    name: 'Business Services',
    subDepartments: [
      { id: 8, name: 'Accounting & Accounting Services' },
      { id: 9, name: 'Auctions' },
      { id: 10, name: 'Business Services - General' },
      { id: 11, name: 'Call Centers & Business Centers' },
      { id: 12, name: 'Career' },
      { id: 13, name: 'Commercial Printing' },
    ],
  },
];

const DepartmentList = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggleExpand = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelect = (id: number, subIds: number[] = []) => {
    const allIds = [id, ...subIds];
    const allSelected = allIds.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected(selected.filter((item) => !allIds.includes(item)));
    } else {
      setSelected([...selected, ...allIds.filter((item) => !selected.includes(item))]);
    }
  };

  const handleSubSelect = (subId: number, mainId: number) => {
    const newSelected = selected.includes(subId)
      ? selected.filter((id) => id !== subId)
      : [...selected, subId];

    const mainDept = departments.find((dept) => dept.id === mainId);
    const allSubSelected = mainDept?.subDepartments?.every((sub) => newSelected.includes(sub.id));

    if (allSubSelected && !selected.includes(mainId)) {
      setSelected([...newSelected, mainId]);
    } else if (!allSubSelected && selected.includes(mainId)) {
      setSelected(newSelected.filter((id) => id !== mainId));
    } else {
      setSelected(newSelected);
    }
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.id}>
          <ListItem>
            <Checkbox
              edge="start"
              checked={selected.includes(department.id)}
              onChange={() =>
                handleSelect(
                  department.id,
                  department.subDepartments?.map((sub) => sub.id) || []
                )
              }
            />
            <ListItemText primary={department.name} />
            {department.subDepartments && (
              <IconButton onClick={() => handleToggleExpand(department.id)}>
                {expanded.includes(department.id) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItem>
          <Collapse in={expanded.includes(department.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments?.map((subDept) => (
                <ListItem key={subDept.id} sx={{ pl: 4 }}>
                  <Checkbox
                    edge="start"
                    checked={selected.includes(subDept.id)}
                    onChange={() => handleSubSelect(subDept.id, department.id)}
                  />
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;

