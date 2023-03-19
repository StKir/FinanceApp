import { Helmet } from 'react-helmet';

const HelmetHead = (data: THelmetHead) => {
	const { title, content } = data;
	return (
		<Helmet>
			<meta name='description' content={content} />
			<title>{title}</title>
		</Helmet>
	);
};

interface THelmetHead {
	title: string;
	content: string;
}

export default HelmetHead;
