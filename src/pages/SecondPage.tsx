
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography , Box } from '@mui/material';
import DepartmentList from '../components/DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });


  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
    }

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={posts} columns={columns} paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]} />
      </div>
      <Box 
        mt={4} 
        p={2} 
        border={1} 
        borderColor="grey.300" 
        borderRadius={4}
      >
        <Typography variant="h4" gutterBottom>
          Departments
        </Typography>
        <DepartmentList />  
      </Box>
    </Container>
  );
};

export default SecondPage;
