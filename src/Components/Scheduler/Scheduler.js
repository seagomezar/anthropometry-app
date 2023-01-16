import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState,
  EditingState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  ConfirmationDialog,
  DateNavigator,
  Toolbar,
  TodayButton,
  ViewSwitcher,
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from './appointments';
import { useLocaleState } from 'react-admin';

const Demo = () => {
  const [locale] = useLocaleState();
  const [data, setData] = React.useState(appointments);
  const [currentDate, setCurrentDate] = React.useState(Date.now());

  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [appointmentChanges, setAppointmentChanges] = React.useState(
    {}
  );
  const [editingAppointment, setEditingAppointment] =
    React.useState(undefined);

  const commitChanges = ({ added, changed, deleted }) => {
    setData((data) => {
      if (added) {
        const startingAddedId =
          (data && data.length) > 0
            ? data[data.length - 1].id + 1
            : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter(
          (appointment) => appointment.id !== deleted
        );
      }
      return data;
    });
  };

  const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  };

  const changeEditingAppointment = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };

  return (
    <Paper>
      <Scheduler data={data} height={660} locale={locale}>
        <ViewState
          currentDate={currentDate}
          defaultCurrentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}
        />
        <WeekView startDayHour={6} endDayHour={20} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};

export default Demo;
