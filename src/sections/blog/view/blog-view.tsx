import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';



import dayjs from 'dayjs';
import { PostItem } from '../post-item';
import { PostSort } from '../post-sort';
// import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'HSC',
  'Graduate',
  'Post Graduate',
  'Railway',
  'Wasa',
  'Bank',
  'BCS',
];
const exam_centers = [
  'Dhaka',
  'Chittagong',
  'Khulna',
  'Barishal',
  'Noakhali',
  'Rajshahi',
  'Cumilla',
];

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [centerName, setCenterName] = useState<string[]>([]);
  const [circulars, setCirculars] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [formData, setFormData] = useState<{ title: string, description: string, published_at: string, deadline: string, categories: string[], exam_centers: string[], application_link: string, attachments?: string[] }>({
    title: '',
    description: '',
    published_at: '',
    deadline: '',
    categories: [],
    exam_centers: [],
    application_link: '',
    attachments: []
  });

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem({});
    setFormData({
      title: '',
      description: '',
      published_at: '',
      deadline: '',
      categories: [],
      exam_centers: [],
      application_link: '',
      attachments: []
    });
    setOpen(false);
  };

  const handleCategoryChange = (event: SelectChangeEvent<typeof formData.categories>) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      categories: typeof value === 'string' ? value.split(',') : value,
    });
  };
  const handleCenterChange = (event: SelectChangeEvent<typeof centerName>) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      exam_centers: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleUpdate = (existingData: any) => {
    console.log(existingData);
    setFormData({ ...formData, ...existingData });
    setSelectedItem(existingData);
    handleClickOpen();
  }
  const handleChange = (e: any) => {
    console.log('------------', e);
    console.log('------------', e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    console.log('----------------', _posts);
    // fetch('http://localhost:3000/api/circulars')
    fetch('https://quiz-app-d6b0.onrender.com/api/circulars')
      .then(res => res.json())
      .then(json => setCirculars(json.data))
  }, [])

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Circular
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleClickOpen}
        >
          New circular
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          title: 'adsd',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formmData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formmData as any).entries());
            console.log('===========', formData);
            console.log('===========', formJson);

            const data = new FormData();
            Object.entries(formJson)?.map(item => {
              data.append(item[0], item[1]);
              return item;
            });
            // https://quiz-app-d6b0.onrender.com
            // fetch(`http://localhost:3000/api/circulars`, {
            fetch(`https://quiz-app-d6b0.onrender.com/api/circulars`, {
              method: 'POST',
              body: data
            })
              .then(res => res.json())
              .then(json => {
                circulars.unshift(json.data);
                console.log(_posts)
              });
            handleClose();
          },
        }}
      >
        <DialogTitle>Circular</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address here.
          </DialogContentText>
          <TextField
            value={formData.title}
            onChange={(e) => handleChange(e)}
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            name="description"
            label="Description"
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="standard"
          />
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                sx={{ my: 1, minWidth: '100%' }}
                label="Published At"
                name="published_at"
                value={dayjs(formData.published_at)}
                // defaultValue={formData.description}
                onChange={(e) => handleChange(e)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    required: true
                  }
                }} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ my: 1, minWidth: '100%' }}
                label="Deadline"
                name="deadline"
                value={dayjs(formData.deadline)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    required: true
                  }
                }} />
            </LocalizationProvider>
          </div>

          <FormControl
            variant="standard"
            sx={{ my: 1, minWidth: '100%' }}
            required
          >
            <InputLabel id="demo-multiple-checkbox-label" variant="standard">Categories</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="categories"
              value={formData.categories}
              multiple
              // value={categoryName}
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.join(',')}
              MenuProps={MenuProps}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={formData.categories.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ my: 1, minWidth: '100%' }}
            required
          >
            <InputLabel id="demo-multiple-checkbox-label" variant="standard">Exam Centers</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="exam_centers"
              value={formData.exam_centers}
              multiple
              // value={centerName}
              onChange={handleCenterChange}
              renderValue={(selected) => selected.join(',')}
              MenuProps={MenuProps}
              fullWidth
            >
              {exam_centers.map((exam_center) => (
                <MenuItem key={exam_center} value={exam_center}>
                  <Checkbox checked={formData.exam_centers.indexOf(exam_center) > -1} />
                  <ListItemText primary={exam_center} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="application_link"
            value={formData.application_link}
            onChange={(e) => handleChange(e)}
            label="Application Link"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="attachments"
            label="Attachments"
            type="file"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        {/* <PostSearch posts={_posts} /> */}
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {circulars.length && circulars?.map((post, index) => {
          // const latestPostLarge = index === 0;
          // const latestPost = index === 1 || index === 2;
          const latestPostLarge = false; // always false
          const latestPost = false; // always false

          return (
            <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
              <PostItem handleUpdate={handleUpdate} post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
            </Grid>
          );
        })}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
