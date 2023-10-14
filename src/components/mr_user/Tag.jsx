import styled from '@emotion/styled';
import { Chip } from '@mui/material';

const Tag = ({ text, isHashTag }) => {
  const label = (isHashTag ? '#' : '') + text;
  return <StyledChip label={label} sx={{}} />;
};

export default Tag;

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.grey['800'],
  color: theme.palette.common.white
}));
