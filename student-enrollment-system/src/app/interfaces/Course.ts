  export interface Course {
    _id: string;
    code: string;
    name: string;
    description: string;
    instructor: string;
    start_date: string;
    end_date: string;
    credits: number;
    prerequisites: string[];
    available: boolean;
    fee: number;
    term: string;
    seats: number;
    seats_available: number;
  }
