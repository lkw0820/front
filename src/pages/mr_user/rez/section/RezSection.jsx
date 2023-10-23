import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack
} from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import SectionTitle from '../../../../components/mr_user/SectionTitle';
import { palette } from '../../../../theme/palette';
import RezForm from '../form/RezForm';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import InnerPtForm from '../form/InnerPtForm';
import styled from '@emotion/styled';
import OutterPtForm from '../form/OutterPtForm';
import SuppliesForm from '../form/SuppliesForm';
import dayjs from 'dayjs';

const RezSection = () => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const { mPurpose, mType, rezDate, rezStartTime, rezEndTime, totPtCtn } =
    rezData;
  // 열린 Accordion 표시
  const [expanded, setExpanded] = useState('rez');
  // 예약버튼 활성화 여부
  const [isDisabled, setisDisabled] = useState(true);

  useEffect(() => {
    if (
      mPurpose !== '' &&
      mType !== '' &&
      rezDate !== '' &&
      rezStartTime !== '' &&
      rezEndTime !== '' &&
      totPtCtn !== ''
    ) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [rezData]);

  // Accordion 활성화 표시 이벤트
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // 예약 버튼 이벤트
  const handleBtnSubmit = (e) => {
    e.preventDefault();
    console.log(rezData);
  };

  return (
    <Box component={'section'} sx={{ height: '100%' }}>
      <StyledForm onSubmit={handleBtnSubmit}>
        <Stack sx={{ justifyContent: 'space-between', height: '100%' }}>
          <Box>
            {/* 예약 정보 */}
            <Accordion
              expanded={expanded === 'rez'}
              onChange={handleChange('rez')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'rez' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle title="예약 정보*" sx={{ fontSize: '16px' }}>
                  <AccessTimeRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <RezForm />
              </AccordionDetails>
            </Accordion>

            {/* 내부 참석자 */}
            <Accordion
              expanded={expanded === 'interPt'}
              onChange={handleChange('interPt')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'interPt' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle title="내부 참석자" sx={{ fontSize: '16px' }}>
                  <PersonRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <InnerPtForm />
              </AccordionDetails>
            </Accordion>

            {/* 외부 참석자 */}
            <Accordion
              expanded={expanded === 'outerPt'}
              onChange={handleChange('outerPt')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'outerPt' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle title="외부 참석자" sx={{ fontSize: '16px' }}>
                  <PersonOutlineRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <OutterPtForm />
              </AccordionDetails>
            </Accordion>

            {/* 추가 장비 */}
            <Accordion
              expanded={expanded === 'supplies'}
              onChange={handleChange('supplies')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'supplies' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle title="추가 장비" sx={{ fontSize: '16px' }}>
                  <AddCircleOutlineOutlinedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <SuppliesForm />
              </AccordionDetails>
            </Accordion>
          </Box>
          <RectangleBtn
            type={'submit'}
            text={'예약하기'}
            isDisabled={isDisabled ? true : false}
          />
        </Stack>
      </StyledForm>
    </Box>
  );
};

export default RezSection;

const StyledForm = styled('form')(() => ({
  height: '100%'
}));