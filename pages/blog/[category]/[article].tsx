import { NextPage } from 'next';
import { getArticle, getpostsCountByCate } from '../../../api';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { IPost } from '../../../@types'
import moment from 'moment'
import { Anchor } from 'antd';
import ArticleContent from '../../../components/articlecontent'
import '../../../assets/article.less';
interface IHeading3 {
    href: string;
    title: string;
}
interface IHeading2 extends IHeading3 {
    subs: Array<IHeading3>;
}

const CategoryList: NextPage<{}> = () => {
    const [article, setarticle] = useState({} as IPost);
    const [menus, setmenus] = useState([] as Array<IHeading2>);
    const [postsCount, setpostsCount] = useState(0);
    const [menuShow, setmenuShow] = useState(true);
    const router = useRouter()
    const menusRef = useRef(menus);

    const getDetailData = async () => {
        const result = await getArticle({
            alias: router.query.article
        });
        if (result.status == 200) {
            setarticle(result.data)
            generateMenu()
            getDD(result.data.category._id)
        }
    }

    const getDD = async (id) => {
        const result = await getpostsCountByCate({
            category: id
        });
        if (result.status == 200) {
            setpostsCount(result.data);
        }
    }

    const generateMenu = () => {
        const result: Array<IHeading2> = [];
        const content = document.querySelector('.article-content') as HTMLElement;
        const h2All = content.querySelectorAll('h2');
        h2All.forEach(h2 => {
            const anchor = h2.querySelector('a');
            if (anchor) {
                const h2Item: IHeading2 = {
                    href: `#${anchor.id}`,
                    title: h2.textContent as string,
                    subs: []
                };
                let nextEl = h2.nextElementSibling;
                while (nextEl && nextEl.nodeName !== 'H2') {
                    if (nextEl.nodeName === 'H3') {
                        const anchor = nextEl.querySelector('a');
                        if (anchor) {
                            h2Item.subs.push({
                                href: `#${anchor.id}`,
                                title: nextEl.textContent as string
                            });
                        }
                    }
                    nextEl = nextEl.nextElementSibling;
                }
                result.push(h2Item);
            }
        });
        if (result.length) {
            setmenus(result);
            setmenuShow(true);
        }
    }

    useEffect(() => {
        getDetailData();
    }, [])

    useEffect(() => {
        menusRef.current = menus;
    }, [menus])

    const getLinkItems = () => {
        const res = [];
        menusRef.current.map((item, index) => {
            res.push(
                <Anchor.Link href={item.href} title={item.title} key={index}>
                    {
                        item.subs.map((_iitem, index1) => {
                            return <Anchor.Link key={index1} href={_iitem.href} title={_iitem.title} />
                        })
                    }
                </Anchor.Link>);
        });
        return res;
    }

    return (
        <div className="post-detail-wrap">
            <article className="left-wrap">
                <div className="content-wrap">
                    <header className="article-title">
                        <h1>{article.title}</h1>
                    </header>
                    <main className="article-main">
                        <ArticleContent html={article.html} />
                    </main>
                    <div className="license-wrap">
                        <span>【END】</span>
                        {/* <p>本文链接：{postLink}</p> */}
                        <p>
                            <span>版权声明：本博客所有文章除声明转载外，均采用</span>
                            <a target="_blank">BY-NC-SA 3.0</a>
                            <span>许可协议。转载请注明来自</span>
                        </p>
                    </div>
                    <div className="end-wrap">
                        <span>【END】</span>
                    </div>
                    <div className="article-views">
                        <span>阅读 {article.viewCount}</span>
                        <span className="split-line">|</span>
                        <span>发布于 {moment(article.publishTime).format('YYYY-MM-DD')}</span>
                    </div>
                </div>
            </article>
            <div className="side-wrap">
                <div className="side-block-container">
                    <div className="side-title">分类</div>
                    <div className="category-title">
                        <img src={(article.category || {}).img || ''} />
                        <span>{(article.category || {}).cateName || ''}</span>
                    </div>
                    <a href={`/blog/${(article.category || {}).alias || ''}`} className="ant-btn ant-btn-dashed">
                        <div>
                            <span>全部</span>
                            <span className="posts-count">{postsCount}</span>
                            <span>篇文章</span>
                        </div>
                    </a>
                    <div className={menuShow ? 'sticky-wrap' : ''}>
                        <div className="side-block-container"></div>
                        <div className="side-title">目录</div>
                        <Anchor affix={false} showInkInFixed={true} offsetTop={75} bounds={10}>
                            {getLinkItems()}
                        </Anchor>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CategoryList;