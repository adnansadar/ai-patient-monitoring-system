export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  patients: string[];
  availability: Availability[];
}

export interface Availability {
  day: string;
  time: string;
}
