export const agenda = (req, rep) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date.toISOString());
  }

  const schedules = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return rep.status(200).send({ days, schedules });
};

export const scheduleTime = (req, rep) => {
  return;
};
