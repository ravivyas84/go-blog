import { footerLinks } from '../lib/site-profile';

import { InboxSubscribeCard } from './InboxSubscribeCard';
import { Icon } from './Icon';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="links">
      <div className="site-footer__inner">
        <div className="site-footer__connect">
          <span className="site-footer__label">Let's connect</span>
          <div className="site-footer__links">
            {footerLinks.map((item) => (
              <a
                className="site-footer__link"
                href={item.href}
                key={item.label}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer noopener' : undefined}
              >
                {item.icon && <Icon name={item.icon} className="site-footer__link-icon" />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="site-footer__meta">
          <div>
            Built by <a href="https://ravivyas.com/">Ravi Vyas</a>
          </div>
          <div>Powered by Astro, ChatGPT &amp; Claude</div>
          <div>
            Hosted on <a href="https://vercel.com/" target="_blank" rel="noreferrer noopener">Vercel</a>
          </div>
        </div>

        <InboxSubscribeCard />
      </div>

      <div className="site-footer__copyright">© 2026 Ravi Vyas. All rights reserved.</div>
    </footer>
  );
}
