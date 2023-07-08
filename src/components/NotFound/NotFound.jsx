import React from "react";
import notFound from './img/404.gif';
import { Link } from 'react-router-dom';
import s from './styles.module.css';
export const NotFound = ( {children, title, buttonText = "На главную", buttonAction} ) => {
	return (
		<>
			<div className={s.notFound}>
				<img src={notFound} className={s.image} aria-hidden="true" alt="" />
				<h1 className={s.title}>{title}</h1>
				{children && children}
				{buttonAction
					? <a href="#" className="btn" onClick={buttonAction}>{buttonText}</a>
					: <Link to="/dog3" className="btn" >{buttonText}</Link>
				}
			</div>

		</>
	);
}
