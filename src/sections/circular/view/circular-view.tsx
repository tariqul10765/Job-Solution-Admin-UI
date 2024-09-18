import { DashboardContent } from 'src/layouts/dashboard';
import { useState, useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { _posts } from 'src/_mock';

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
type FormDataInterface = {
  _id: string,
  title: string,
  description: string,
  organization: string,
  job_type: string,
  number_of_position: Number | null,
  vacancies: Number | null,
  educational_qualification: string[],
  exam_center: string,
  minimum_age: Number | null,
  maximum_age: Number | null,
  published_at: Date,
  application_start: Date,
  application_end: Date,
  source: string,
  official_website: string,
  application_link: string,
  attachments?: string[]
}


const educational_qualification = [
  'অষ্টম শ্রেণী',
  'এসএসসি',
  'এইচ এস সি',
  'স্নাতক',
  'স্নাতক সমান',
  'স্নাতকোত্তর',
  'ডিগ্রি',
  'বিবিএ',
  'এমবিএ',
  'বিএ',
  'বিএসসি',
  'বিকম',
  'এম এ',
  'মাস্টার্স',
  'ডিপ্লোমা/ইঞ্জিনিয়ারিং/নার্সিং',
  'এমবিবিএস',
  'পিএইচডি',
  'আই বি এ'
];
const initialFormData = {
  _id: '',
  title: '',
  description: '',
  organization: '',
  job_type: '',
  number_of_position: null,
  vacancies: null,
  educational_qualification: [],
  exam_center: '',
  minimum_age: null,
  maximum_age: null,
  published_at: new Date(),
  application_start: new Date(),
  application_end: new Date(),
  source: '',
  official_website: '',
  application_link: '',
  attachments: []
}

export function CircularView() {
  const [sortBy, setSortBy] = useState('latest');
  const [open, setOpen] = useState(false);
  const [circulars, setCirculars] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [formData, setFormData] = useState<FormDataInterface>(initialFormData);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('======================');
    setSelectedItem({});
    setOpen(false);
    setFormData(initialFormData);
    setFormData((prev: FormDataInterface) => ({ ...initialFormData }));
    console.log(formData, initialFormData);
  };

  const handleCategoryChange = (event: SelectChangeEvent<typeof formData.educational_qualification>) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      educational_qualification: typeof value === 'string' ? value.split(',') : value,
    });
  };
  const handleJobTypeChange = (e: any) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      job_type: e.target.value,
    });
  }

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
  const handleQuillEditorChange = (e: any) => {
    setFormData({
      ...formData,
      description: e
    });
  }
  const paperRef = useRef<any>(null); // Reference to the Paper element

  useEffect(() => {
    if (paperRef.current) {
      const dialogContent = paperRef.current.querySelector('.MuiPaper-root');
      if (dialogContent) {
        // Scroll to the top of the content
        dialogContent.scrollTop = 0;
      }
    }
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
          ref: paperRef, // Attach the ref to the Paper element
          // style: { maxHeight: '500px', overflowY: 'auto' },
          // title: 'adsd',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formmData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formmData as any).entries());
            // console.log('===========', formData);
            // console.log('===========', formJson);

            const data = new FormData();
            data.append('description', formData.description)
            Object.entries(formJson)?.map(item => {
              data.append(item[0], item[1]);
              return item;
            });

            console.log('222222222222222222', formJson, formData.description);
            // https://quiz-app-d6b0.onrender.com
            const url = `https://quiz-app-d6b0.onrender.com/api/circulars/${formData._id ? formData._id : ''}`
            // fetch(`http://localhost:3000/api/circulars`, {
            await fetch(url, {
              method: formData._id ? 'PATCH' : 'POST',
              body: data
            })
              .then(res => res.json())
              .then(json => {
                console.log('11111111111111111111111', json);
                if (!json.success) {
                  alert(json.message);
                  return;
                }
                if (formData._id) {
                  const index = circulars.findIndex(item => item._id === formData._id);
                  circulars[index] = json.data;
                } else {
                  circulars.unshift(json.data);
                }
                setCirculars([...circulars])
                handleClose();
                setTimeout(() => { alert(json.message); }, 500)
              });
          },
        }}
      >
        <DialogTitle>Circular</DialogTitle>
        <DialogContent>
          <TextField
            value={formData.title}
            onChange={(e) => handleChange(e)}
            autoFocus
            // required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />
          {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
          <Box sx={{ mt: 1, mb: 10 }}>
            <p>Description</p>
            <ReactQuill
              style={{ height: '100px', minHeight: '200px', margin: '20px 0' }}
              theme="snow"
              value={formData.description}
              onChange={(e) => handleQuillEditorChange(e)}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image'],
                  ['clean']
                ],
              }}
              tabIndex={0} />
          </Box>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.organization}
            onChange={(e) => handleChange(e)}
            name="organization"
            label="Organization"
            fullWidth
            variant="standard"
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.job_type}
            onChange={(e) => handleChange(e)}
            name="job_type"
            label="Job Type"
            fullWidth
            variant="standard"
          /> */}
          <FormControl
            variant="standard"
            sx={{ my: 1, minWidth: '100%' }}
          // required
          >
            <InputLabel id="demo-multiple-checkbox-label" variant="standard">Job Type</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="job_type"
              value={formData.job_type}
              onChange={handleJobTypeChange}
              MenuProps={MenuProps}
              fullWidth
            >
              {['সরকারি', 'বেসরকারি'].map((category) => (
                // <Option value={category}>{category}</Option>
                <MenuItem key={category} value={category}>
                  {/* <Checkbox checked={formData.educational_qualification.indexOf(category) > -1} /> */}
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.number_of_position}
            onChange={(e) => handleChange(e)}
            name="number_of_position"
            label="Number Of Position"
            type='number'
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.vacancies}
            onChange={(e) => handleChange(e)}
            name="vacancies"
            label="Vacancies"
            type='number'
            fullWidth
            variant="standard"
          />
          <FormControl
            variant="standard"
            sx={{ my: 1, minWidth: '100%' }}
          // required
          >
            <InputLabel id="demo-multiple-checkbox-label" variant="standard">Educational Qualification</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="educational_qualification"
              value={formData.educational_qualification}
              multiple
              // value={categoryName}
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.join(',')}
              MenuProps={MenuProps}
              fullWidth
            >
              {educational_qualification.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={formData.educational_qualification.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.exam_center}
            onChange={(e) => handleChange(e)}
            name="exam_center"
            label="Exam Center"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.minimum_age}
            onChange={(e) => handleChange(e)}
            name="minimum_age"
            label="Minimum Age"
            type='number'
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formData.maximum_age}
            onChange={(e) => handleChange(e)}
            name="maximum_age"
            label="Maximum Age"
            type='number'
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
                    // required: true
                  }
                }} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ my: 1, minWidth: '100%' }}
                label="Application Start Date"
                name="application_start"
                value={dayjs(formData.application_start)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    // required: true
                  }
                }} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ my: 1, minWidth: '100%' }}
                label="Application End Date"
                name="application_end "
                value={dayjs(formData.application_end)}
                slotProps={{
                  textField: {
                    variant: "standard",
                    // required: true
                  }
                }} />
            </LocalizationProvider>
          </div>

          <TextField
            autoFocus
            // required
            margin="dense"
            id="name"
            name="source"
            value={formData.source}
            onChange={(e) => handleChange(e)}
            label="Source"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            // required
            margin="dense"
            id="name"
            name="official_website"
            value={formData.official_website}
            onChange={(e) => handleChange(e)}
            label="Official Website"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            // required
            margin="dense"
            id="name"
            name="application_link"
            value={formData.application_link}
            onChange={(e) => handleChange(e)}
            label="Application Link"
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
          <Button type="submit">{formData._id ? 'Update' : 'Create'}</Button>
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
