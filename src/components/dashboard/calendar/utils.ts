
export const getEventColor = (type?: string) => {
  switch (type) {
    case 'birthday':
      return '#FCD34D';
    case 'family':
      return '#34D399';
    case 'important':
      return '#EF4444';
    default:
      return '#4F46E5';
  }
};

export const calendarMessages = {
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  today: "Aujourd'hui",
  previous: 'Précédent',
  next: 'Suivant',
  noEventsInRange: 'Aucun événement dans cette période',
};
