import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { InputForm } from '@/components/atoms/InputForm';
import styles from './styles.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
	validationErrors?: String[];
	labelText?: string;
};

export const InputFormArea = ({
	type = 'text',
	name,
	placeholder,
	value,
	onChange,
	validationErrors = [],
	labelText = '',
}: Props) => {
	return (
		<>
			<div className={styles.wrapper}>
				<InputForm
					labelText={labelText}
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{!!validationErrors.length && (
					<ValidationErrorBox messages={validationErrors} />
				)}
			</div>
		</>
	);
};
