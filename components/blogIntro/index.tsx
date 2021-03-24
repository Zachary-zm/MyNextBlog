import { NextPage } from 'next';
import './index.less'
import { Empty } from 'antd'
import MarkdownIt from 'markdown-it';
import React, { useState, useEffect } from 'react'

interface CateListProps {
    intro?: string;
}

const CategoryList: NextPage<CateListProps> = (props) => {
    const { intro } = props
    const [introHtml, setintroHtml] = useState({ __html: '' });

    useEffect(() => {
        const md = new MarkdownIt({
            html: true,
            breaks: false
        });
        setintroHtml(md.render('Just for example'))
    })

    return (
        <div className="widget-container">
            <div className="widget-header">
                博客简介
            </div>
            <div className="widget-body">
                {
                    intro ? <div className="intro-content" dangerouslySetInnerHTML={introHtml} />
                        :
                        <Empty description={'暂无内容'}>
                        </Empty>
                }
            </div>
        </div>
    )
}

export default CategoryList;