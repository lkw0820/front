import styled from '@emotion/styled';
import { Chip, Tooltip, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import format from 'date-fns/format';

const setTitle = (data) => {
  // data 객체의 status 값에 따라 title을 설정
  if (data === '1') {
    return '미처리';
  } else if (data === '2') {
    return '취소';
  } else if (data === '3') {
    return '운행 대기';
  } else if (data === '4') {
    return '운행중';
  } else {
    return '운행 완료';
  }
};

const setColor = (data) => {
  // data 객체의 status 값에 따라 color를 설정
  if (data === '1') {
    return '#9e9e9e';
  } else if (data === '2') {
    return '#d32f2f';
  } else if (data === '3') {
    return '#ffc107';
  } else if (data === '4') {
    return '#1769aa';
  } else {
    return '#2e7d32';
  }
};

const CarRezList = ({ carRezData, handleClickRow }) => {
  const columns = [
    {
      field: 'rez_status',
      headerName: '상태',
      width: 160,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={setTitle(params.value)}
          sx={{
            borderColor: setColor(params.value),
            color: setColor(params.value)
          }}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'car_name',
      headerName: '차량',
      width: 180,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="subtitle2">{params.row.car_code}</Typography>
          <Tooltip title={params.value} placement="bottom-start">
            <Typography
              variant="caption"
              display="block"
              sx={{
                '& .MuiTypography-caption': {
                  display: 'block'
                },
                margin: 'auto',
                textOverflow: 'ellipsis',
                width: '120px',
                overflow: 'hidden'
              }}
            >
              {params.value}
            </Typography>
          </Tooltip>
        </Box>
      )
    },
    {
      field: 'name',
      headerName: '예약자',
      type: '',
      width: 160,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box
          display="flex"
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" sx={{ marginRight: '15px' }}>
            {params.row.dept_name}
          </Typography>
          <Typography variant="subtitle2">{params.row.name}</Typography>
        </Box>
      )
    },
    {
      field: 'start_at',
      headerName: '예약 일시',
      type: 'number',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box width="100%">
          <Typography textAlign="center" variant="button" display="block">
            {params.row.start_at}
          </Typography>
          <Typography textAlign="center" variant="button" display="block">
            {format(new Date(params.row.return_at), 'yyyy-MM-dd HH:mm:ss')}
          </Typography>
        </Box>
      )
    },
    {
      field: 'detail',
      headerName: '목적',
      width: 160,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    }
  ];

  return (
    <StyledContainer>
      <Box
        sx={{
          width: '100%',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        <DataGrid
          rows={carRezData}
          columns={columns}
          getRowId={(row) => row.car_rez_code}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          localeText={{
            noRowsLabel: '등록된 예약 내역이 없습니다.'
          }}
          pageSizeOptions={[5, 10, 15]}
          sx={{
            maxHeight: '590px',
            borderRadius: '2px',
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important'
            },
            '& .MuiDataGrid-row': { cursor: 'pointer' }
          }}
          rowHeight={70}
          onRowClick={(row) => {
            handleClickRow(row.row.car_rez_code);
          }}
        />
      </Box>
    </StyledContainer>
  );
};

export default CarRezList;

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  overflow: 'auto',
  padding: '20px',
  borderRadius: 10
}));
