export interface Course {
    id: string;
    name: string;
    avgGrade: number | null;
    subjects: string[];
}

export interface Grade {
    id: string;
    total: number;
    a_per: number;
    ab_per: number;
    b_per: number;
    bc_per: number;
    c_per: number;
    d_per: number;
    f_per: number;
    other_per: number;
}
