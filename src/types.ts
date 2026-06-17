export type Page = 'dashboard' | 'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate';

export interface PageProps {
  onNavigate: (page: Page) => void;
}
