export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface ProjectEvidence {
  /** TODO: Add real project evidence to each project record when available. */
  screenshots?: ProjectScreenshot[];
  role?: string;
  impact?: string;
  challenge?: string;
  caseStudyUrl?: string;
}
