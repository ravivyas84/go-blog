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
  | 'menu'
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
  status: 'active' | 'on-hold' | 'shutdown';
  title: string;
};

export type ExplorationItem = {
  icon: IconName;
  text: string;
};

export const siteNav: NavItem[] = [
  { href: '/posts/', icon: 'writing', label: 'Writing', match: '/posts/' },
  { href: '/projects-and-tools/', icon: 'projects', label: 'Projects and Tools', match: '/projects-and-tools/' },
  { href: '/about/', icon: 'about', label: 'About', match: '/about/' },
  { href: '/videos/', icon: 'book-open', label: 'Videos', match: '/videos/' },
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
  href: '/about/',
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

export const featuredProjectItems: ProjectItem[] = [
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

export const projectsAndToolsPageItems: ProjectItem[] = [
  ...featuredProjectItems,
  {
    title: 'Odiocast',
    description: 'Archived audio product page for the original podcasting experiment.',
    href: '/odiocast/',
    icon: 'podcast',
    label: 'Open',
    status: 'shutdown',
  },
  {
    title: 'PureMetrics',
    description: 'Archived analytics product page for the discontinued product.',
    href: '/puremetrics/',
    icon: 'box',
    label: 'Open',
    status: 'shutdown',
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
  href: '/about/',
  cta: 'Read the full story',
  quote: 'The best way to predict the future is to build it.',
};

export const aboutPageProfile = {
  title: "At heart, I’m a perpetual learner and tinkerer.",
  intro:
    'I love turning ideas into products and exploring how technology changes the way we work and live.',
  current:
    'Right now, I’m deeply focused on adopting AI across my personal workflows and professional product work.',
  traits: ['India', 'Builder', 'Curious', 'Impact driven'],
};

export const aboutPageExperience = [
  "Lead Product Manager – Lowe's India",
  'Head of Product – Jambox Games',
  'Product & Growth Consultant – Various',
  'Head of Growth – Arctype',
  'Co-founder & CEO – PureMetrics',
  'Chief Product Officer – YourStory',
  'Co-founder & CEO – Odiocast',
  'VP Product – MoEngage',
  'Head of Marketing & Customer Development – MoEngage',
  'Product Manager – Vserv',
  'Developer Evangelist – Vserv',
  'Android Developer – TechJini',
];

export const aboutPageOtherActivities =
  'Founding co-organizer at Blrdroid, a 7000+ strong Android community. I am inactive now.';

export const aboutPageWritingContributions = ['HackerNoon', 'Product Coalition', 'YourStory'];

export const aboutPageEducation =
  'I hold a Masters in Computer Science from Florida State University and a Bachelors from R.N.S.I.T Bangalore.';

export const aboutPageSiteLinks = [
  {
    title: 'Read my writing',
    copy: 'essays & notes',
    href: '/posts/',
    icon: 'writing' as const,
  },
  {
    title: 'Explore projects',
    copy: "what I'm building",
    href: '/projects-and-tools/',
    icon: 'projects' as const,
  },
  {
    title: 'Podcast',
    copy: 'Multiple Lenses',
    href: 'https://multiplelenses.com/',
    icon: 'podcast' as const,
    external: true,
  },
  {
    title: 'All my links',
    copy: 'social & more',
    href: '#links',
    icon: 'link' as const,
  },
];

export const aboutPageQuote = 'The best way to predict the future is to build it.';

export const aboutPageNote = ['Curious forever.', 'Building always.'];

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
