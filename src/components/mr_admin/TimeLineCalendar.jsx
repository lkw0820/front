import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import listPlugin from '@fullcalendar/list';
const TimeLineCalendar = ({ events, resources }) => {
  const businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6], // 월~토

    startTime: '9:00', // 시작 시간
    endTime: '22:00' // 종료 시간
  };
  return (
    <div>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          resourceTimelinePlugin,
          resourceTimeGridPlugin,
          listPlugin
        ]}
        initialView="resourceTimeline"
        nowIndicator={true}
        businessHours={businessHours}
        events={events}
        resourceAreaHeaderContent={'회의실'}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right:
            'resourceTimeGridDay,resourceTimelineDay,resourceTimelineMonth,listWeek'
        }}
        views={{
          resourceTimeGridDay: {
            buttonText: '회의실'
          },
          resourceTimelineDay: {
            buttonText: '시간대'
          },
          resourceTimelineMonth: {
            buttonText: '월'
          },
          listWeek: {
            buttonText: '리스트'
          }
        }}
        resources={resources}
        // schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        slotMinTime={businessHours.startTime}
        slotMaxTime={businessHours.endTime} // 11pm
      />
    </div>
  );
};

export default TimeLineCalendar;

// [
//     // 이벤트 데이터를 설정
//     {
//       title: 'title 1',
//       start: '2023-10-19 12:00:00',
//       end: '2023-10-19 14:00:00'
//     },
//     { title: '이벤트 2', date: '2023-10-28' }
//   ]