import { TreeItem, TreeView } from '@mui/x-tree-view';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Badge,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import Toggle from '../../../../components/common/Toggle';
import styled from '@emotion/styled';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';
import axiosInstance from '../../../../utils/axios';

const BmMemModal = ({
  open,
  handleModal,
  list,
  initList,
  selectMems,
  setSelectMems,
  master
}) => {
  // 적용 대상 리스트에서 선택된 멤버
  const [checkMemName, setCheckMemName] = useState(null);
  // 전체 리스트에서 선택된 멤머
  const [addMemName, setAddMemName] = useState(null);
  // 선택된 토글 버튼 값
  const [selectBtn, setSelectBtn] = useState('all');

  // 토글버튼 데이터
  const toggleData = [
    {
      index: 0,
      value: 'all',
      name: '전체'
    },
    {
      index: 1,
      value: 'search',
      name: '검색'
    }
  ];

  // 부서명 추출
  const uniqueDeptNames = new Set();
  list.forEach((user) => {
    if (user.deptVO && user.deptVO['dept_name']) {
      uniqueDeptNames.add(user.deptVO['dept_name']);
    }
  });
  // 부서명 array
  const uniqueDeptNamesArray = Array.from(uniqueDeptNames);

  // 부서별 사원 array
  const deptList = [];
  uniqueDeptNamesArray.forEach((i) => {
    const dept = list.filter((user) => user.deptVO['dept_name'] === i);
    deptList.push(dept);
  });

  // 트리 데이터
  const result = uniqueDeptNamesArray.map((item, index) => ({
    dept: item,
    members: deptList[index]
  }));

  // 토글 버튼 이벤트
  const handleToggleBtn = (e) => {
    setSelectBtn(e.currentTarget.value);
  };

  // 트리 데이터 아이템 클릭 이벤트
  const handleSelect = (event, nodeIds) => {
    const selecMem = list.filter((mem) => mem.name === nodeIds);
    if (selecMem.length !== 0) {
      setAddMemName(selecMem[0].mem_code);
    }
  };

  // 선택된 참석자 아이템 클릭 이벤트
  const handlePtItem = (event, nodeId) => {
    setCheckMemName(nodeId);
  };

  // 추가 버튼 이벤트
  const handleAddBtn = () => {
    const addMem = list.filter((mem) => mem.mem_code === addMemName);
    const isExist = selectMems.find(
      (item) => item.mem_code === addMem[0].mem_code
    );
    if (isExist) return;
    setSelectMems([...selectMems, ...addMem]);
  };

  // 제외 버튼 이벤트
  const handleDeleteBtn = () => {
    const lestMems = selectMems.filter((mem) => mem.name !== checkMemName);
    setSelectMems([...lestMems]);
  };

  // 확인 버튼 이벤트
  const handleConfirm = async () => {
    const data = {
      master: master, // 사용자 번호
      member: addMemName // 지정자 번호
    };

    // db 추가
    const res = await axiosInstance.post('/mr/mem/bm', data);
    console.log(res);
    handleModal();
  };

  // 이미 등록된 멤버 표시하는 라벨
  const InitLabel = ({ code }) => {
    const res = initList.filter((item) => item.mem_code === code);
    if (res.length !== 0) {
      return (
        <Typography
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px',
            borderRadius: '2px',
            backgroundColor: palette.grey['100']
          }}
        >
          등록
        </Typography>
      );
    }

    return null;
  };

  const ContentByToggle = () => {
    switch (selectBtn) {
      case 'all':
        return (
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={handleSelect}
          >
            {result.map((item, index) => (
              <TreeItem nodeId={item.dept} label={item.dept} key={index}>
                {item.members.map((item, index) => (
                  <TreeItem
                    nodeId={item.name}
                    label={
                      <Stack direction={'row'} gap={1}>
                        <Typography
                          sx={{ fontSize: '14px', fontWeight: 'bold' }}
                        >
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: '13px' }}>
                          ({item.email})
                        </Typography>
                        <InitLabel code={item.mem_code} />
                      </Stack>
                    }
                    sx={{
                      margin: '4px 0'
                    }}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeView>
        );
      case 'search':
        return <Box>서치</Box>;
      case 'bookmark':
        return <Box>즐겨찾기</Box>;
      default:
        return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth={true}
      maxWidth={'md'}
      PaperProps={{
        sx: {
          height: '550px'
        }
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">즐겨찾기 멤버 등록</Typography>
        </DialogTitle>
        <IconButton
          onClick={handleModal}
          aria-label="close"
          sx={{ padding: '24px' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <Grid container sx={{ display: 'flex', height: '100%' }}>
          <Grid item xs={5}>
            <Stack sx={{ rowGap: '20px' }}>
              <Toggle
                data={toggleData}
                selectBtn={selectBtn}
                handleToggleBtn={handleToggleBtn}
                sx={{ width: '100%' }}
              />
              <Box
                sx={{
                  padding: '20px 10px',
                  height: '300px',
                  border: '1px solid #aaa',
                  overflowY: 'scroll'
                }}
              >
                {ContentByToggle()}
              </Box>
            </Stack>
          </Grid>

          {/* 버튼 영역 */}
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            xs={2}
          >
            <Stack spacing={1}>
              <StyledArrowBtn aria-label="add" onClick={handleAddBtn}>
                추가
              </StyledArrowBtn>
              <StyledArrowBtn aria-label="delete" onClick={handleDeleteBtn}>
                제외
              </StyledArrowBtn>
            </Stack>
          </Grid>

          {/* 적용 영역 */}
          <Grid item sx={{ paddingTop: '40px' }} xs={5}>
            <Typography variant="h6">적용 대상 </Typography>
            <Box
              sx={{
                padding: '20px 10px',
                height: '300px',
                border: '1px solid #aaa',
                overflowY: 'scroll'
              }}
            >
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={handlePtItem}
              >
                {selectMems &&
                  selectMems.map((item, index) => (
                    <TreeItem
                      nodeId={item.name}
                      label={item.name}
                      key={index}
                    />
                  ))}
              </TreeView>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ paddingBottom: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',

            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px', width: '300px' }}>
            <RectangleBtn
              type={'button'}
              text={'취소'}
              category={'cancel'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleModal}
            />
            <RectangleBtn
              type={'button'}
              text={'확인'}
              category={'register'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleConfirm}
            />
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default BmMemModal;

const StyledArrowBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey['100']
}));
