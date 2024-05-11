import { ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
	children: ReactNode;
};

export const ContentWrapper = ({ children }: Props) => {
	return (
		<>
			<div className={styles.wrapper}>{children}</div>
		</>
	);
};
