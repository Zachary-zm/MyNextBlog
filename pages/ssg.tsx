import { NextPage } from "next";
import React from "react";
import { getPosts } from '../api';
import '../assets/self-styles.less';
import PostItem from '../components/postitem'

interface CateListProps {
    data: [];
}

const profile: NextPage<CateListProps> = (props) => {
    const { data } = props;
    if (data.length > 0) {
        return (
            <div className="post-left" style={{background: 'white', padding:'100px', margin:'100px'}}>
                <div className="profile-container">
                    {data.map((item: any, index) => {
                        if(item.category){
                            return <PostItem post={item} key={item._id} />;
                        }else{
                            return <div key={index}>1313131313131</div>
                        }
                    })}
                </div>
            </div>
        );
    }
};

export const getStaticProps = async () => {
    const result = await getPosts({
        category: '',
        filterType: '',
        sortBy: '',
        keyword: '',
    })
    return {
        props: {
            data: result.status == 200 ? result.data.postList : [],
        },
    };
};

export default profile;
