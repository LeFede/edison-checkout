export interface Course {
  id: number;
  airtableId: string;
  name: string;
  status: string;
  edition: number;
  courseRid: string;
  crmRid: string;
  emailAirtable: any;
  createdAt: string;
  updatedAt: any;
  urlLanding: string;
  urlCheckout: any;
  urlVideo: string;
  urlGif: string;
  previewUrl: any;
  generalLearningOutcome: string;
  seoTitle: string;
  seoDescription: string;
  rescheduleCause: any;
  rescheduleDetail: any;
  cancelationCause: any;
  cancelationDetail: any;
  categoryId: number;
  courseConfigId: number;
  academyId: number;
  type: string;
  inscriptions: Inscription[];
  milestones: Milestone[];
  prices: Price[];
  category: Category;
  subcategories: any[];
  audiences: Audience[];
  users: User2[];
  events: Event[];
  config: Config;
  classCount: number;
}

export interface Inscription {
  id: number;
  leadId: number;
  userId?: number;
  utm_source?: string;
  utm_medium: any;
  utm_campaign?: string;
  utm_content: any;
  utm_component: any;
  fbclid: any;
  status: string;
  source: string;
  attribution: any;
  origin: any;
  eventId: any;
  courseId: number;
  npsId: any;
  createdAt: string;
  updatedAt: string;
  lead: Lead;
  user?: User;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  area?: string;
  phone: string;
  country: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_component: any;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export interface User {
  id: number;
  email: string;
  name: any;
  password: string;
  country: any;
  linkedin: any;
  signature: any;
  description: any;
  social: any;
  seniority: any;
  area: any;
  phone: any;
  token: any;
  nickname: any;
  expertise: any;
  picture: string;
  jobTitle: any;
  company: any;
  companyLogo: any;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  instructorRid: any;
  lastTimeOnline: any;
  balance: number;
}

export interface Milestone {
  id: number;
  name: string;
  eventId: any;
  audienceId: any;
  courseId: number;
  order: number;
}

export interface Price {
  id: number;
  value: number;
  currency: string;
  courseId: number;
}

export interface Category {
  id: number;
  value: string;
  htmlColor: string;
  academyId: number;
  visible: boolean;
}

export interface Audience {
  id: number;
  name: string;
  context: string;
  courseId: number;
  milestones: Milestone2[];
}

export interface Milestone2 {
  id: number;
  name: string;
  eventId: any;
  audienceId: number;
  courseId: any;
  order: number;
}

export interface User2 {
  userId: number;
  courseId: number;
  isInstructor: boolean;
  isCoach: boolean;
  isPropietario: boolean;
  user: User3;
}

export interface User3 {
  id: number;
  email: string;
  name: string;
  country: string;
  linkedin: string;
  signature: string;
  description: string;
  social: string;
  seniority: any;
  area: any;
  phone: string;
  nickname: string;
  expertise: any;
  picture: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  instructorRid: string;
  lastTimeOnline: string;
  balance: number;
}

export interface Event {
  id: number;
  goal: string;
  startTime: string;
  finishTime: string;
  timeZone: string;
  duration: number;
  day: number;
  description: any;
  detail: any;
  courseId: number;
  calendarId: string;
  calendarURL: string;
  meetURL: string;
  recordingURL: any;
  headerDesktopURL: any;
  headerMobileURL: any;
  landingURL: any;
  presentationURL: any;
  featured: boolean;
  order: number;
  categoryId: any;
  eventType: string;
  status: any;
  milestones: Milestone3[];
}

export interface Milestone3 {
  id: number;
  name: string;
  eventId: number;
  audienceId: any;
  courseId: any;
  order: number;
}

export interface Config {
  id: number;
  courseId: number;
  favorite: boolean;
  published: boolean;
  comingSoon: boolean;
  isValidated: boolean;
  isAsync: boolean;
  isPlatformEnabled: boolean;
  editableByInstructor: boolean;
  test: boolean;
  abTesting: boolean;
  abTestingUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: any;
}

export interface AdaptedCourse {
  alreadyStarted: boolean;
  comingSoon: boolean;
  courseId: number;
  courseRid: string;
  daysTilCourse: number;
  estado: string;
  finalDateString: string;
  finishTime: string;
  isAsync: boolean;
  name: string;
  prices: Price[];
  slug: string;
  startTime: string;
  type: string;
  users: Pick<User, "name">[];
}
