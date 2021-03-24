import Link from "next/link";
import { NextPage } from 'next';
import './index.less'
import { Drawer, Button} from 'antd';
import { IPost } from '../../@types'
import moment from 'moment';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye } from '@fortawesome/free-regular-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
const { parse } = require('url')

interface postProps {
    post: IPost;
}

const PostItem: NextPage<postProps> = (props) => {
    const { post } = props
    const [drawer, setdrawer] = useState(false)

    const parseUrl = (link) => {
        if (process.title) {
            return parse(link, true);
        }
        return parse(link);
    }

    const displayUrl = (link) => {
        const url = parseUrl(link);
        return url.hostname;
    }

    const redirectUrl = (link) => {
        const url = parseUrl(link);
        return url.origin;
    }

    return (
        <div className="blog-item">
            <div className="item-header">{ moment(post.publishTime).format('YYYY/MM/DD') }</div>
            {
                !post.isLocal ?
                    <>
                        <h4>
                            <a href={post.url} title={post.title} target="_blank">
                                <span>{post.title}</span>
                            </a>
                        </h4>
                        <div className="item-footer2">
                            <Link href={post.category.alias ? `/blog/${post.category.alias}` : '/'}>
                                <span>
                                    <img src={post.category.img} />
                                    <span>{post.category.cateName}</span>
                                </span>
                            </Link>
                            <a href={redirectUrl(post.url)} title={redirectUrl(post.url)} target="_blank">
                                {displayUrl(post.url)}
                            </a>
                        </div>
                    </>
                    :
                    <>
                        <a className="preview-link" title={"点击预览"} onClick={() => (setdrawer(true))} />
                        <h4>
                            <Link href={`/blog/${post.category.alias}/${post.alias}`}>
                                {post.title}
                            </Link>
                        </h4>
                        <div className="item-footer1">
                            <Link href={post.category.alias ? `/blog/${post.category.alias}` : '/'}>
                                <span>
                                    <img src={post.category.img}  style={{ 'marginRight' : '10px'}} />
                                    {post.category.cateName}
                                </span>
                            </Link>
                            <span title={`浏览数: ${post.viewCount}`}>
                                <FontAwesomeIcon icon={faEye}/>
                                {post.viewCount}
                            </span>
                            <span title={`评论数: 13`}>
                                <FontAwesomeIcon icon={faComments}/>
                                13
                            </span>
                        </div >
                    </>
            }
            <div className="hr-line-dashed" />
            <Drawer visible={drawer} onClose={() => setdrawer(false)} width={790} title={post.title} footer={
                <div className="preview-footer">
                    <Button onClick={() => setdrawer(false)}>关闭</Button>
                    <Button type="primary" href={`/blog/${post.category.alias}/${post.alias}`} target="_blank">完整模式</Button>
               </div>
            }>
                <div className="preview-article">
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </Drawer>
        </div>
    )
}

export default PostItem;