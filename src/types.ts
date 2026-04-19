import React from 'react';

export interface CaseStudy {
  id: number;
  index: string;
  title: string;
  tags: string[];
  year: string;
  duration: string;
  role: string;
  event: string;
  description: string;
  outcome: string;
  color: string;
  image: string;
  slug: string;
  externalLink?: string;
}

export interface Social {
  label: string;
  href: string;
  icon: React.ReactNode;
}
