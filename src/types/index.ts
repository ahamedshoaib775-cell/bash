export interface Project {
  id: string;
  title: string;
  category: 'Websites' | 'Apps' | 'Marketing' | 'Automation';
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  metric?: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
}

export type CursorMode = 'default' | 'hover' | 'button' | 'view';

export interface CursorContextType {
  cursorText: string;
  cursorMode: CursorMode;
  setCursor: (mode: CursorMode, text?: string) => void;
  resetCursor: () => void;
}
