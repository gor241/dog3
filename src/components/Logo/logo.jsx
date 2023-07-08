import React from 'react'
import { Link } from 'react-router-dom';
import './index.css';
import logoSrc from './logo.svg'

function Logo({className, href,title,refreshIcon, ...props}) {
  const hrefValue = href ? href : null;
  return (
     hrefValue 
      ?  <Link to={{pathname: hrefValue}}  className={className ? className : "logo"} title={title} onClick={refreshIcon}>
            <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
        </Link>
      : <a href='#'  className={className ? className : "logo"} title={title}>
            <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
        </a>
  )
}

export default Logo;
