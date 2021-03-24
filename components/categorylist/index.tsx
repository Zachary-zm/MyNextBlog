import { NextPage } from 'next';
import './index.less'
import ActiveLink from '../activelink'

interface CateListProps {
    categories?: any[];
}

const CategoryList: NextPage<CateListProps> = (props) => {
    const { categories } = props

    return (
        <div className="category-wrap">
            <ul className="category-list">
                {categories.map((e: any) => {
                    return (
                        <li key={e._id}>
                            <ActiveLink activeClassName="active" href={e.alias ? `/blog/${e.alias}` : '/'} key={e._id} asPath={e.alias}>
                                <a>
                                    <img src={e.img} />
                                    <span>{e.cateName}</span>
                                </a>
                            </ActiveLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default CategoryList;