export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  description: string;
  price?: string;
  specifications: Record<string, string>;
  images: string[];
  availability: boolean;
  isFeatured: boolean;
  createdAt: any;
}

export interface Inquiry {
  id: string;
  type?: 'general' | 'expert_consultation';
  name: string;
  mobile: string;
  email: string;
  productId?: string;
  product?: string;
  productName?: string;
  message: string;
  date?: string;
  timeSlot?: string;
  consultationType?: string;
  status: 'new' | 'read' | 'replied' | 'pending';
  createdAt: any;
}

export interface Content {
  hero: {
    headline: string;
    subheadline: string;
  };
  about: string;
  contact: {
    address: string;
    mobile: string;
    hours: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}
