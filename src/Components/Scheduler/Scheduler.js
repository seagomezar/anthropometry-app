import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
} from "@devexpress/dx-react-scheduler-material-ui";
import { useGetList, useDataProvider } from "react-admin";

const NutritionistScheduler = () => {
  const dataProvider = useDataProvider();
  const [appointments, setAppointments] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState(Date.now());

  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [appointmentChanges, setAppointmentChanges] = React.useState({});

  const { data } = useGetList("appointment");

  React.useEffect(() => {
    if (data?.length) {
      setAppointments(data);
    }
  }, [data]);
  const [editingAppointment, setEditingAppointment] = React.useState(undefined);

  const commitChanges = ({ added, changed, deleted }) => {
    console.log(added);
    if (added) {
      dataProvider
        .create("appointment", {
          data: {
            ...added,
            nutritionist_id: 1,
          },
        })
        .then(({ data }) => {
          const newAppointments = [...appointments, { ...data }];
          setAppointments(newAppointments);
        });
    } else {
      setAppointments((appointments) => {
        if (changed) {
          console.log(changed);
          appointments = appointments.map((appointment) => {
            if(changed[appointment.id]) {
              dataProvider.update("appointment", {
                id: appointment.id,
                data: { ...appointment, ...changed[appointment.id] },
              });
              return { ...appointment, ...changed[appointment.id] }
            } else {
              return appointment;
            }
          });
        }
        if (deleted !== undefined) {
          dataProvider.delete("appointment", { id: deleted });
          appointments = appointments.filter(
            (appointment) => appointment.id !== deleted
          );
        }
        return appointments;
      });
    }
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
      <Scheduler
        data={appointments}
        height={660}
        defaultCurrentDate={currentDate}
      >
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
        <WeekView startDayHour={6} endDayHour={23}/>
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

export default NutritionistScheduler;
