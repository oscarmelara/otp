
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { MouseEvent } from 'react';

import { SocialLinks } from '../../../interfaces/footer';

import { socialLinks } from './init-values';
import './main-footer.scss';

// -----------------------------------------------------------------------------
//   Component
// -----------------------------------------------------------------------------

export default function Footer(): JSX.Element {
  const onClickGoTo: (event: MouseEvent<HTMLAnchorElement>) => void = (
    (event: MouseEvent<HTMLAnchorElement>): void => {
      event.preventDefault();
    }
  );

  return (
    <>
      <footer className="main-footer flex items-center justify-between">
        <div className="copy-text">&copy; 2019-2021 All Rights Reserved.</div>
        <ul className="list list-none inline-flex">
          {socialLinks.map((item: SocialLinks, index: number): JSX.Element => (
            <li className="item flex items-center" key={index}>
              <a href={item.url} className="link inline-block" onClick={onClickGoTo}>
                <img src={`/assets/icons/social/${item.icon}.png`} className="icon" alt="Icon" />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
