export type IconName =
  | 'about'
  | 'arrow-right'
  | 'book-open'
  | 'box'
  | 'clock'
  | 'flask'
  | 'github'
  | 'link'
  | 'linkedin'
  | 'mail'
  | 'mastodon'
  | 'moon'
  | 'notes'
  | 'pen'
  | 'podcast'
  | 'projects'
  | 'rss'
  | 'search'
  | 'spark'
  | 'sun'
  | 'twitter'
  | 'writing';

export type NavItem = {
  href: string;
  icon: IconName;
  label: string;
  match: string;
};

export type LinkItem = {
  external?: boolean;
  href: string;
  icon?: IconName;
  label: string;
};

export type TopicChipItem = {
  color: 'amber' | 'blue' | 'green' | 'pink' | 'slate' | 'violet';
  href: string;
  label: string;
};

export type WritingItem = {
  date: string;
  href: string;
  id: string;
  tags: string[];
  title: string;
};

export type ProjectItem = {
  description: string;
  href: string;
  icon: IconName;
  label: string;
  status: 'active' | 'on-hold';
  title: string;
};

export type ExplorationItem = {
  icon: IconName;
  text: string;
};

export const siteNav: NavItem[] = [
  { href: '/', icon: 'writing', label: 'Writing', match: '/' },
  { href: '/#projects', icon: 'projects', label: 'Projects', match: '/#projects' },
  { href: '/#about', icon: 'about', label: 'About', match: '/#about' },
  { href: '/#links', icon: 'link', label: 'Links', match: '/#links' },
];

export const heroTraits = ['Product builder', 'Tinkerer', 'AI-powered learner'];

export const heroDescription =
  'I write about product management, software, AI-assisted work, developer tools, marketing technology, and the changing nature of knowledge work.';

export const heroProfile = {
  title: "Hi, I'm Ravi.",
  intro:
    "I'm a product leader and builder interested in how AI changes the way we work, build, learn and make decisions.",
  current:
    'Currently exploring AI adoption across my personal workflows and professional product work.',
  href: '/#about',
  cta: 'More about me',
};

export const explorationItems: ExplorationItem[] = [
  {
    icon: 'spark',
    text: 'AI-assisted product discovery and problem framing',
  },
  {
    icon: 'box',
    text: 'Marketing technology and retail media',
  },
  {
    icon: 'notes',
    text: 'Tools for knowledge work and thinking',
  },
  {
    icon: 'pen',
    text: 'Indie building and developer productivity',
  },
];

export const projectItems: ProjectItem[] = [
  {
    title: 'Atypical PM',
    description: 'Documentation styled site where I write about Product Management.',
    href: 'https://atypicalpm.com/',
    icon: 'writing',
    label: 'Visit',
    status: 'active',
  },
  {
    title: 'DailyNotes',
    description: 'A VS Code extension I use to capture and review my daily notes.',
    href: '/dailynotes/',
    icon: 'notes',
    label: 'Visit',
    status: 'active',
  },
  {
    title: 'CapabilityMap',
    description: 'Visual capability mapping and planning tool for product teams.',
    href: '/capabilitymap/',
    icon: 'projects',
    label: 'Visit',
    status: 'active',
  },
  {
    title: 'Multiple Lenses',
    description: 'Podcast where I look at topics from different perspectives.',
    href: 'https://multiplelenses.com/',
    icon: 'podcast',
    label: 'Visit',
    status: 'active',
  },
  {
    title: 'StitchIQ',
    description: 'A Google Sheets plugin as a side project.',
    href: 'https://workspace.google.com/marketplace/app/stitchiq/931004878305',
    icon: 'box',
    label: 'Visit',
    status: 'on-hold',
  },
  {
    title: 'World Clock New Tab',
    description: 'Chrome new-tab extension for tracking multiple time zones at a glance.',
    href: 'https://chromewebstore.google.com/detail/world-clock-new-tab/djodahehfhfcipmidmijnmfnenapaldf',
    icon: 'clock',
    label: 'Visit',
    status: 'active',
  },
];

export const topicChips: TopicChipItem[] = [
  { label: 'Product Management', href: '/tag/product-management/', color: 'blue' },
  { label: 'AI', href: '/tag/artificial-intelligence/', color: 'violet' },
  { label: 'Developer Tools', href: '/tag/software-development/', color: 'green' },
  { label: 'Knowledge Work', href: '/posts/', color: 'amber' },
  { label: 'Startups', href: '/tag/entrepreneurship/', color: 'amber' },
  { label: 'Building in Public', href: '/tag/updates/', color: 'pink' },
  { label: 'Marketing Tech', href: '/posts/', color: 'slate' },
  { label: 'Notes', href: '/tag/productivity/', color: 'slate' },
];

export const aboutBanner = {
  title: 'About Ravi Vyas',
  summary:
    "I'm a product leader, builder, and lifelong learner. My journey spans product management, entrepreneurship, developer tools, analytics, and embracing AI to multiply impact.",
  href: '/#about',
  cta: 'Read the full story',
  quote: 'The best way to predict the future is to build it.',
};

export const footerLinks: LinkItem[] = [
  { href: 'https://mastodon.social/@ravi', icon: 'mastodon', label: 'Mastodon', external: true },
  { href: 'https://twitter.com/ravivyas84', icon: 'twitter', label: 'Twitter', external: true },
  { href: 'https://www.linkedin.com/in/ravivyas/', icon: 'linkedin', label: 'LinkedIn', external: true },
  { href: 'https://github.com/ravivyas84', icon: 'github', label: 'GitHub', external: true },
  { href: '/feed.xml', icon: 'rss', label: 'RSS' },
];

export const inboxSubscribe = {
  title: 'Get new posts in your inbox',
  href: 'https://ravivyas.substack.com/',
  cta: 'Subscribe',
};
