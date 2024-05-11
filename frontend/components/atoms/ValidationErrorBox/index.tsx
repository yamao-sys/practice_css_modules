import styles from './styles.module.scss';

type Props = {
	messages: String[];
};

export const ValidationErrorBox = ({ messages }: Props) => {
	return (
		<div className={styles.wrapper}>
			{messages.map((message, i) => (
				<p key={i} className={styles.text}>
					{message}
				</p>
			))}
		</div>
	);
};
