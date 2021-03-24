import { NextPage } from 'next';

interface contentProps {
    html?: any;
}

const Content: NextPage<contentProps> = (props) => {
    const { html } = props
    return (
        <div className="article-content" dangerouslySetInnerHTML={{ __html : html }} />
    )
}

export default Content;