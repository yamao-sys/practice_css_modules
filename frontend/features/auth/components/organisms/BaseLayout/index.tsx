import { Container } from '@/components/organisms/Container';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
	title: string;
	children: ReactNode;
};

export const BaseLayout = ({ title, children }: Props) => {
	return (
		<>
			<Container>
				<h1 className={styles.title}>{title}</h1>
				<ContentWrapper>{children}</ContentWrapper>
			</Container>
		</>
	);
};
