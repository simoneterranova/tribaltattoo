export type Lang = 'en' | 'it';

export interface I18nStrings {
  common: {
    backToHome: string;
    signOut: string;
    confirmed: string;
    cancelled: string;
    completed: string;
    keepIt: string;
    yesCancel: string;
  };
  dashboard: {
    badge: string;
    sectionLabel: string;
    title: string;
    todayBookings: string;
    todayRevenue: string;
    weekBookings: string;
    addBooking: string;
    blockTimeSlot: string;
    shopSettings: string;
    today: string;
    closed: string;
    allUpcoming: string;
    complete: string;
    cancel: string;
    markComplete: string;
    cancelBooking: string;
    cancelBookingTitle: string;
    cancelBookingDesc: (name: string, service: string, date: string, time: string) => string;
    walkIn: string;
    bookingLabel: string;
    serviceLabel: string;
    durationLabel: string;
    priceLabel: string;
    blockSlotTitle: string;
    blockSlotDesc: string;
    date: string;
    selectTime: string;
    reasonOptional: string;
    reasonPlaceholder: string;
    shopClosedOn: (day: string) => string;
    noSlotsToBlock: string;
    blocked: string;
    unblockSlotTitle: string;
    unblockSlotDesc: (date: string, time: string) => string;
    keepBlocked: string;
    unblock: string;
    blockBtn: (time: string) => string;
    shopSettingsTitle: string;
    shopSettingsDesc: string;
    closedDays: string;
    days: string[];
    openingHours: string;
    open: string;
    closeWeekdays: string;
    closeSaturday: string;
    dailyBreak: string;
    breakDesc: string;
    breakStart: string;
    breakEnd: string;
    removeBreak: string;
    saveSettings: string;
    addClientTitle: string;
    clientLabel: string;
    serviceStepLabel: string;
    dateTimeLabel: string;
    clientDetails: string;
    customerName: string;
    phoneNumber: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    continue: string;
    selectService: string;
    pickDateTime: string;
    noSlotsDate: string;
    allSlotsTaken: string;
    reviewConfirm: string;
    notesOptional: string;
    notesPlaceholder: string;
    confirmBooking: string;
    bookedTitle: string;
    bookedDesc: (name: string, service: string, date: string, time: string) => string;
    done: string;
    stepLabels: { client: string; service: string; datetime: string; confirm: string };
  };
  myBookings: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    newBooking: string;
    upcoming: string;
    noUpcoming: string;
    history: string;
    addToCalendar: string;
    googleCalendar: string;
    appleCalendar: string;
    reschedule: string;
    cancel: string;
    cancelBookingTitle: string;
    cancelBookingDesc: (service: string, date: string, time: string) => string;
    keepIt: string;
    yesCancel: string;
    remove: string;
    removeFromHistoryTitle: string;
    removeFromHistoryDesc: (service: string, date: string) => string;
    yesRemove: string;
    rescheduleTitle: string;
    rescheduleDesc: (service: string) => string;
    selectDate: string;
    noSlotsDate: string;
    confirmReschedule: string;
  };
  notifications: {
    title: string;
    new: (n: number) => string;
    markRead: string;
    clearAll: string;
    empty: string;
    emptyDesc: string;
    booked: (name: string, service: string) => string;
    cancelled: (name: string, service: string) => string;
    deleted: string;
    dismissLabel: string;
    actionBooked: string;
    actionCancelled: string;
  };
  bookingDialog: {
    signInTitle: string;
    registerTitle: string;
    signInDesc: string;
    registerDesc: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    signIn: string;
    signInContinue: string;
    createAccount: string;
    noAccount: string;
    haveAccount: string;
    signUp: string;
    checkEmail: string;
    checkEmailDesc: string;
    backToSignIn: string;
    stepService: string;
    stepDatetime: string;
    stepConfirm: string;
    selectService: string;
    pickDateTime: string;
    noSlotsDate: string;
    allSlotsTaken: string;
    selectDatePrompt: string;
    reviewConfirm: string;
    notesOptional: string;
    notesPlaceholder: string;
    confirmBtn: string;
    successTitle: string;
    successDesc: (service: string, date: string, time: string) => string;
    addToCalendar: string;
    googleCalendar: string;
    appleCalendar: string;
    viewMyBookings: string;
    done: string;
    sidebarTitle: string;
    sidebarService: string;
    sidebarDatetime: string;
    date: string;
    time: string;
    continue: string;
  };
}

const en: I18nStrings = {
  common: {
    backToHome: 'Back to Home',
    signOut: 'Sign Out',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    completed: 'Completed',
    keepIt: 'Keep It',
    yesCancel: 'Yes, Cancel',
  },
  dashboard: {
    badge: 'Barber',
    sectionLabel: 'Barber Dashboard',
    title: 'Dashboard',
    todayBookings: "Today's Bookings",
    todayRevenue: "Today's Revenue",
    weekBookings: "Week's Bookings",
    addBooking: 'Add Booking',
    blockTimeSlot: 'Block Time Slot',
    shopSettings: 'Shop Settings',
    today: 'Today',
    closed: 'Closed',
    allUpcoming: 'All Upcoming',
    complete: 'Complete',
    cancel: 'Cancel',
    markComplete: 'Mark Complete',
    cancelBooking: 'Cancel Booking',
    cancelBookingTitle: 'Cancel Booking?',
    cancelBookingDesc: (name, service, date, time) =>
      `Cancel ${name}'s ${service} on ${date} at ${time}?`,
    walkIn: 'Walk-in',
    bookingLabel: 'Booking',
    serviceLabel: 'Service',
    durationLabel: 'Duration',
    priceLabel: 'Price',
    blockSlotTitle: 'Block Slot',
    blockSlotDesc: 'Prevent bookings on a specific time slot.',
    date: 'Date',
    selectTime: 'Select Time',
    reasonOptional: 'Reason (optional)',
    reasonPlaceholder: 'e.g. Lunch break, Personal errand...',
    shopClosedOn: (day) => `Shop is closed on ${day}s.`,
    noSlotsToBlock: 'No available slots to block on this date.',
    blocked: 'Blocked',
    unblockSlotTitle: 'Unblock Slot?',
    unblockSlotDesc: (date, time) => `Make ${date} at ${time} available again?`,
    keepBlocked: 'Keep Blocked',
    unblock: 'Unblock',
    blockBtn: (time) => `Block ${time}`,
    shopSettingsTitle: 'Shop Settings',
    shopSettingsDesc: 'Configure your shop hours, closing days, and breaks.',
    closedDays: 'Closed Days',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    openingHours: 'Opening Hours',
    open: 'Open',
    closeWeekdays: 'Close (weekdays)',
    closeSaturday: 'Close (Saturday)',
    dailyBreak: 'Daily Break (optional)',
    breakDesc: 'Automatically blocks these time slots every day (e.g. lunch).',
    breakStart: 'Break start',
    breakEnd: 'Break end',
    removeBreak: 'Remove break',
    saveSettings: 'Save Settings',
    addClientTitle: 'Add a\nClient',
    clientLabel: 'Client',
    serviceStepLabel: 'Service',
    dateTimeLabel: 'Date & Time',
    clientDetails: 'Client Details',
    customerName: 'Customer Name',
    phoneNumber: 'Phone Number',
    namePlaceholder: 'Full name',
    phonePlaceholder: '+1 234 567 8900',
    continue: 'Continue',
    selectService: 'Select Service',
    pickDateTime: 'Pick Date & Time',
    noSlotsDate: 'No slots on this date. Try another day.',
    allSlotsTaken: 'All slots are taken on this date. Try another day.',
    reviewConfirm: 'Review & Confirm',
    notesOptional: 'Notes (optional)',
    notesPlaceholder: 'Any special requests or notes...',
    confirmBooking: 'Confirm Booking',
    bookedTitle: 'Booked',
    bookedDesc: (name, service, date, time) =>
      `${name}'s ${service} is confirmed for ${date} at ${time}.`,
    done: 'Done',
    stepLabels: { client: 'Client', service: 'Service', datetime: 'Date & Time', confirm: 'Confirm' },
  },
  myBookings: {
    sectionLabel: 'My Account',
    title: 'My Bookings',
    subtitle: 'View, reschedule, or cancel your upcoming appointments.',
    newBooking: 'New Booking',
    upcoming: 'Upcoming',
    noUpcoming: 'No upcoming bookings. Book your next appointment above.',
    history: 'History',
    addToCalendar: 'Add to Calendar',
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple Calendar (.ics)',
    reschedule: 'Reschedule',
    cancel: 'Cancel',
    cancelBookingTitle: 'Cancel Booking?',
    cancelBookingDesc: (service, date, time) =>
      `This will cancel your ${service} on ${date} at ${time}. This action cannot be undone.`,
    keepIt: 'Keep It',
    yesCancel: 'Yes, Cancel',
    remove: 'Remove',
    removeFromHistoryTitle: 'Remove from History?',
    removeFromHistoryDesc: (service, date) =>
      `This will permanently delete your ${service} booking from ${date}.`,
    yesRemove: 'Yes, Remove',
    rescheduleTitle: 'Reschedule',
    rescheduleDesc: (service) => `Pick a new date and time for your ${service} appointment.`,
    selectDate: 'Select a date to see available times',
    noSlotsDate: 'No available slots on this date.',
    confirmReschedule: 'Confirm Reschedule',
  },
  notifications: {
    title: 'Notifications',
    new: (n) => `${n} new`,
    markRead: 'Mark read',
    clearAll: 'Clear all',
    empty: 'No notifications yet',
    emptyDesc: 'New bookings and cancellations will appear here in real-time.',
    booked: (name, service) => `${name} booked ${service}`,
    cancelled: (name, service) => `${name} cancelled ${service}`,
    deleted: 'A booking was removed from your calendar.',
    dismissLabel: 'Dismiss notification',
    actionBooked: 'booked',
    actionCancelled: 'cancelled',
  },
  bookingDialog: {
    signInTitle: 'Sign In',
    registerTitle: 'Create Account',
    signInDesc: 'Sign in to book your appointment.',
    registerDesc: 'Create an account to get started.',
    email: 'Email',
    emailPlaceholder: 'john@example.com',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    namePlaceholder: 'John Doe',
    phonePlaceholder: 'Phone (optional)',
    signIn: 'Sign In',
    signInContinue: 'Sign In & Continue',
    createAccount: 'Create Account',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signUp: 'Sign Up',
    checkEmail: 'Check Your Email',
    checkEmailDesc: "We've sent a confirmation link to your email. Click it to activate your account, then come back to sign in.",
    backToSignIn: 'Back to Sign In',
    stepService: 'Select Service',
    stepDatetime: 'Pick Date & Time',
    stepConfirm: 'Review & Confirm',
    selectService: 'Select Service',
    pickDateTime: 'Pick Date & Time',
    noSlotsDate: 'No slots on this date. Try another day.',
    allSlotsTaken: 'All slots are taken on this date. Try another day.',
    selectDatePrompt: 'Select a date to see available times',
    reviewConfirm: 'Review & Confirm',
    notesOptional: 'Notes (optional)',
    notesPlaceholder: 'Any special requests...',
    confirmBtn: 'Confirm Booking',
    successTitle: "You're Booked",
    successDesc: (service, date, time) =>
      `Your ${service} is confirmed for ${date} at ${time}.`,
    addToCalendar: 'Add to Calendar',
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple Calendar (.ics)',
    viewMyBookings: 'View My Bookings',
    done: 'Done',
    sidebarTitle: 'Book a\nSeat',
    sidebarService: 'Service',
    sidebarDatetime: 'Date & Time',
    date: 'Date',
    time: 'Time',
    continue: 'Continue',
  },
};

const it: I18nStrings = {
  common: {
    backToHome: 'Torna alla Home',
    signOut: 'Esci',
    confirmed: 'Confermato',
    cancelled: 'Annullato',
    completed: 'Completato',
    keepIt: 'Mantieni',
    yesCancel: 'Sì, Annulla',
  },
  dashboard: {
    badge: 'Barbiere',
    sectionLabel: 'Dashboard Barbiere',
    title: 'Dashboard',
    todayBookings: 'Prenotazioni Oggi',
    todayRevenue: 'Incasso Oggi',
    weekBookings: 'Prenotazioni Settimana',
    addBooking: 'Aggiungi Prenotazione',
    blockTimeSlot: 'Blocca Slot',
    shopSettings: 'Impostazioni',
    today: 'Oggi',
    closed: 'Chiuso',
    allUpcoming: 'Tutte le Prossime',
    complete: 'Completa',
    cancel: 'Annulla',
    markComplete: 'Segna Completato',
    cancelBooking: 'Annulla Prenotazione',
    cancelBookingTitle: 'Annullare la Prenotazione?',
    cancelBookingDesc: (name, service, date, time) =>
      `Annullare ${service} di ${name} il ${date} alle ${time}?`,
    walkIn: 'Walk-in',
    bookingLabel: 'Prenotazione',
    serviceLabel: 'Servizio',
    durationLabel: 'Durata',
    priceLabel: 'Prezzo',
    blockSlotTitle: 'Blocca Slot',
    blockSlotDesc: 'Impedisci prenotazioni su un orario specifico.',
    date: 'Data',
    selectTime: 'Seleziona Orario',
    reasonOptional: 'Motivo (opzionale)',
    reasonPlaceholder: 'es. Pausa pranzo, Commissione...',
    shopClosedOn: (day) => `Il negozio è chiuso il ${day}.`,
    noSlotsToBlock: 'Nessuno slot disponibile da bloccare in questa data.',
    blocked: 'Bloccato',
    unblockSlotTitle: 'Sbloccare lo Slot?',
    unblockSlotDesc: (date, time) => `Rendere ${date} alle ${time} di nuovo disponibile?`,
    keepBlocked: 'Mantieni Bloccato',
    unblock: 'Sblocca',
    blockBtn: (time) => `Blocca ${time}`,
    shopSettingsTitle: 'Impostazioni Negozio',
    shopSettingsDesc: 'Configura orari, giorni di chiusura e pause.',
    closedDays: 'Giorni di Chiusura',
    days: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    openingHours: 'Orari di Apertura',
    open: 'Apertura',
    closeWeekdays: 'Chiusura (giorni feriali)',
    closeSaturday: 'Chiusura (sabato)',
    dailyBreak: 'Pausa Giornaliera (opzionale)',
    breakDesc: 'Blocca automaticamente questi slot ogni giorno (es. pranzo).',
    breakStart: 'Inizio pausa',
    breakEnd: 'Fine pausa',
    removeBreak: 'Rimuovi pausa',
    saveSettings: 'Salva Impostazioni',
    addClientTitle: 'Aggiungi\nCliente',
    clientLabel: 'Cliente',
    serviceStepLabel: 'Servizio',
    dateTimeLabel: 'Data & Ora',
    clientDetails: 'Dati Cliente',
    customerName: 'Nome Cliente',
    phoneNumber: 'Numero di Telefono',
    namePlaceholder: 'Nome e cognome',
    phonePlaceholder: '+39 333 123 4567',
    continue: 'Continua',
    selectService: 'Seleziona Servizio',
    pickDateTime: 'Scegli Data & Ora',
    noSlotsDate: 'Nessuno slot in questa data. Prova un altro giorno.',
    allSlotsTaken: 'Tutti gli slot sono occupati. Prova un altro giorno.',
    reviewConfirm: 'Riepilogo & Conferma',
    notesOptional: 'Note (opzionale)',
    notesPlaceholder: 'Richieste speciali o note...',
    confirmBooking: 'Conferma Prenotazione',
    bookedTitle: 'Prenotato',
    bookedDesc: (name, service, date, time) =>
      `${service} di ${name} confermato per ${date} alle ${time}.`,
    done: 'Fatto',
    stepLabels: { client: 'Cliente', service: 'Servizio', datetime: 'Data & Ora', confirm: 'Conferma' },
  },
  myBookings: {
    sectionLabel: 'Il Mio Account',
    title: 'Le Mie Prenotazioni',
    subtitle: 'Visualizza, riprogramma o cancella i tuoi appuntamenti.',
    newBooking: 'Nuova Prenotazione',
    upcoming: 'Prossime',
    noUpcoming: 'Nessuna prenotazione. Prenota il tuo prossimo appuntamento.',
    history: 'Storico',
    addToCalendar: 'Aggiungi al Calendario',
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple Calendar (.ics)',
    reschedule: 'Riprogramma',
    cancel: 'Annulla',
    cancelBookingTitle: 'Annullare la Prenotazione?',
    cancelBookingDesc: (service, date, time) =>
      `Stai per annullare ${service} il ${date} alle ${time}. Questa azione non può essere annullata.`,
    keepIt: 'Mantieni',
    yesCancel: 'Sì, Annulla',
    remove: 'Rimuovi',
    removeFromHistoryTitle: 'Rimuovere dallo Storico?',
    removeFromHistoryDesc: (service, date) =>
      `La prenotazione di ${service} del ${date} verrà eliminata definitivamente.`,
    yesRemove: 'Sì, Rimuovi',
    rescheduleTitle: 'Riprogramma',
    rescheduleDesc: (service) => `Scegli una nuova data e orario per ${service}.`,
    selectDate: 'Seleziona una data per vedere gli orari disponibili',
    noSlotsDate: 'Nessuno slot disponibile in questa data.',
    confirmReschedule: 'Conferma Riprogrammazione',
  },
  notifications: {
    title: 'Notifiche',
    new: (n) => `${n} nuov${n === 1 ? 'a' : 'e'}`,
    markRead: 'Segna lette',
    clearAll: 'Cancella tutto',
    empty: 'Nessuna notifica',
    emptyDesc: 'Le nuove prenotazioni e cancellazioni appariranno qui in tempo reale.',
    booked: (name, service) => `${name} ha prenotato ${service}`,
    cancelled: (name, service) => `${name} ha annullato ${service}`,
    deleted: 'Una prenotazione è stata rimossa dal tuo calendario.',
    dismissLabel: 'Ignora notifica',
    actionBooked: 'ha prenotato',
    actionCancelled: 'ha annullato',
  },
  bookingDialog: {
    signInTitle: 'Accedi',
    registerTitle: 'Crea Account',
    signInDesc: 'Accedi per prenotare il tuo appuntamento.',
    registerDesc: 'Crea un account per iniziare.',
    email: 'Email',
    emailPlaceholder: 'mario@esempio.it',
    password: 'Password',
    confirmPassword: 'Conferma Password',
    fullName: 'Nome e Cognome',
    namePlaceholder: 'Mario Rossi',
    phonePlaceholder: 'Telefono (opzionale)',
    signIn: 'Accedi',
    signInContinue: 'Accedi & Continua',
    createAccount: 'Crea Account',
    noAccount: 'Non hai un account?',
    haveAccount: 'Hai già un account?',
    signUp: 'Registrati',
    checkEmail: 'Controlla la Email',
    checkEmailDesc: 'Abbiamo inviato un link di conferma alla tua email. Clicca su di esso per attivare il tuo account, poi torna qui per accedere.',
    backToSignIn: 'Torna ad Accedi',
    stepService: 'Seleziona Servizio',
    stepDatetime: 'Scegli Data & Ora',
    stepConfirm: 'Riepilogo & Conferma',
    selectService: 'Seleziona Servizio',
    pickDateTime: 'Scegli Data & Ora',
    noSlotsDate: 'Nessuno slot in questa data. Prova un altro giorno.',
    allSlotsTaken: 'Tutti gli slot sono occupati. Prova un altro giorno.',
    selectDatePrompt: 'Seleziona una data per vedere gli orari disponibili',
    reviewConfirm: 'Riepilogo & Conferma',
    notesOptional: 'Note (opzionale)',
    notesPlaceholder: 'Richieste speciali...',
    confirmBtn: 'Conferma Prenotazione',
    successTitle: 'Prenotato!',
    successDesc: (service, date, time) =>
      `Il tuo ${service} è confermato per ${date} alle ${time}.`,
    addToCalendar: 'Aggiungi al Calendario',
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple Calendar (.ics)',
    viewMyBookings: 'Le Mie Prenotazioni',
    done: 'Chiudi',
    sidebarTitle: 'Prenota\nOra',
    sidebarService: 'Servizio',
    sidebarDatetime: 'Data & Ora',
    date: 'Data',
    time: 'Orario',
    continue: 'Continua',
  },
};

export const i18n: Record<Lang, I18nStrings> = { en, it };
