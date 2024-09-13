import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export type PostItemProps = {
  _id: string;
  title: string;
  description?: string;
  published_at: string;
  deadline: string;
  categories: string[];
  exam_centers: string[];
  application_link: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;


  // coverUrl: string;
  // totalViews: number;
  // totalShares: number;
  // totalComments: number;
  // totalFavorites: number;
  // postedAt: string | number | null;
  // author: {
  //   name: string;
  //   avatarUrl: string;
  // };
};

export function PostItem({
  sx,
  post,
  latestPost,
  latestPostLarge,
  handleUpdate,
  ...other
}: CardProps & {
  post: PostItemProps;
  handleUpdate: any;
  latestPost: boolean;
  latestPostLarge: boolean;
}) {
  // const renderAvatar = (
  //   <Avatar
  //     alt={post.author.name}
  //     src={post.author.avatarUrl}
  //     sx={{
  //       left: 24,
  //       zIndex: 9,
  //       bottom: -24,
  //       position: 'absolute',
  //       ...((latestPostLarge || latestPost) && {
  //         top: 24,
  //       }),
  //     }}
  //   />
  // );
  const [postData, setPostData] = useState({});

  const handleUpdateData = () => {
    handleUpdate(postData);
  }
  useEffect(() => {
    setPostData(post);
  }, [post])

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {post.title}
    </Link>
  );

  const edit = (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 15,
        mt: 3,
        color: 'text.disabled',
      }}
    >
      <Button variant="outlined" onClick={() => handleUpdateData()}>
        edit
      </Button>
    </Box>
  )

  const renderInfo = (
    <Box
      gap={1.5}
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        // { number: post.totalComments, icon: 'solar:chat-round-dots-bold' },
        // { number: post.totalViews, icon: 'solar:eye-bold' },
        // { number: post.totalShares, icon: 'solar:share-bold' },
      ].map((info, _index) => (
        <Box
          key={_index}
          display="flex"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.64,
              color: 'common.white',
            }),
          }}
        >
          {/* <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography> */}
        </Box>
      ))}
    </Box>
  );

  const renderCover = (
    <Box
      component="img"
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
      alt={post?.title}
      // src=''
      src={post?.attachments && post?.attachments.length ? post.attachments[0] : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(post.createdAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      width={88}
      height={36}
      src="/assets/icons/shape-avatar.svg"
      sx={{
        left: 0,
        zIndex: 9,
        bottom: -16,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          pt: 'calc(100% * 3 / 4)',
          ...((latestPostLarge || latestPost) && {
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: varAlpha(theme.palette.grey['900Channel'], 0.72),
            },
          }),
          ...(latestPostLarge && {
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }),
        })}
      >
        {renderShape}
        {/* {renderAvatar} */}
        {renderCover}
      </Box>

      <Box
        sx={(theme) => ({
          p: theme.spacing(6, 3, 3, 3),
          ...((latestPostLarge || latestPost) && {
            width: 1,
            bottom: 0,
            position: 'absolute',
          }),
        })}
      >
        {edit}
        {renderDate}
        {renderTitle}
        {renderInfo}
      </Box>
    </Card>
  );
}
