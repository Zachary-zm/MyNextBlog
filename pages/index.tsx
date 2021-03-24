
// import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next-redux-wrapper';
import { Input, Select, DatePicker, Button, Spin } from 'antd';
// import { User, Topic } from '../@types/index'
import { getPosts, getCategories } from '../api';
import '../assets/self-styles.less';
import Categorylist from '../components/categorylist'
import PostItem from '../components/postitem'
import BlogIntro from '../components/blogIntro'
import moment from 'moment'
import ArticleCalendar from '../components/articlecalendar'
import { allCategoryItem } from '../server/models/category';
import { useRouter } from 'next/router'

// const fetcher = (url) => fetch(url).then((res) => res.json())
const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD' || undefined;
const Home: NextPage<{}> = () => {
  const [loading, setloading] = useState(false);
  const [cateData, setcateData] = useState([]);
  const [categoryID, setcategoryID] = useState('');
  const [startTime, setstartTime] = useState(undefined);
  const [endTime, setendTime] = useState(undefined)
  const [sortBy, setsortBy] = useState('date');
  const [keyword, setkeyword] = useState('' as Array<string> | string);
  const [inputTxt, setinputTxt] = useState('');
  const [postData, setpostData] = useState([])
  const [filterType, setfilterType] = useState('text');
  const [alertShow, setalertShow] = useState('none');
  const [count, setcount] = useState(0);
  const keywordRef = useRef(keyword);
  const filterTypeRef = useRef(filterType);
  const startTimeRef = useRef(startTime);
  const endTimeRef = useRef(endTime);
  const router = useRouter()


  const getPostData = async (pageIndex = 1, pageSize = 10) => {
    setloading(true);
    try {
      const result = await getPosts({
        category: categoryID,
        pageIndex,
        pageSize,
        filterType: filterTypeRef.current,
        sortBy,
        keyword: keywordRef.current,
      })
      setpostData(result.data.postList);
      if (result.status == 200) {
        setcount(result.data.count);
        setloading(false);
      }
      // setData(result)
    } catch (error) {
      console.log(error);

    }
  }

  const getCateData = async () => {
    try {
      const result = await getCategories()
      const categories = result.data || [];
      categories.unshift(allCategoryItem);
      setcateData(categories)
      const category = categories.find(item => item.alias === router.query.category);
      setcategoryID(category ? category._id : '')
      // setData(result)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // 调用接口
    getCateData();
    getPostData();
  }, [])

  useEffect(() => {
    keywordRef.current = keyword;
    filterTypeRef.current = filterType;
    startTimeRef.current = startTime;
    endTimeRef.current = endTime;
  }, [keyword, filterType, startTime, endTime])


  useEffect(() => {
    const category = cateData.find(item => item.alias === router.query.category);
    setalertShow('none');
    setcategoryID(category ? category._id : '')
  }, [router.query.category]);

  useEffect(() => {
    console.log(categoryID);
    getPostData();
  }, [categoryID]);


  const sortList = async (type) => {
    if (sortBy === type) {
      return;
    }
    setsortBy(type);
    // this.search(false);
  }

  const clearSearch = () => {
    setalertShow('none');
    setkeyword('')
    setfilterType('text')
  }

  const search = () => {
    setloading(true);
    let input: Array<string> | string;
    if (filterTypeRef.current === 'date') {
      input = [moment(startTimeRef.current).startOf('day').toString(), moment(endTimeRef.current).endOf('day').toString()];
    } else {
      input = inputTxt;
    }
    setalertShow('none');
    setkeyword(input);
    setTimeout(getPostData, 0);
    if (input) {
      setalertShow('block');
    }
  }

  const onPickerChange = (date, dateString) => {
    console.log(date);
    setstartTime(dateString[0])
    setendTime(dateString[1])
  }

  const filterTypeChange = (e) => {
    setfilterType(e);
  }
  const change_input = (e) => {
    setinputTxt(e.target.value);
  }

  const selectCalendar = (inputDateMoment: [moment.Moment, moment.Moment]) => {
    filterTypeChange('date');
    // filterTypeRef.current = 'date';
    setstartTime(inputDateMoment[0].format(dateFormat))
    setendTime(inputDateMoment[1].format(dateFormat))
    // search();
    setTimeout(search, 0);
  }

  return (
    <div>

      <Categorylist categories={cateData} />

      <div className="post-wrap">
        <div className="post-left">
          <div className="post-top">
            <div className="post-top-left">
              <a className={sortBy === 'data' ? 'active' : ''} onClick={() => sortList('date')}>日期</a>
              <a className={sortBy === 'title' ? 'active' : ''} onClick={() => sortList('title')}>标题</a>
            </div>
            <div className="post-top-right">
              <Input.Group compact>
                <Select value={filterType} onChange={filterTypeChange}>
                  <Option value="text">全文</Option>
                  <Option value="title">标题</Option>
                  <Option value="tag">标签</Option>
                  <Option value="date">日期</Option>
                </Select>
                {
                  filterType !== 'date' ? <Input style={{ width: '50%' }} value={inputTxt} onChange={change_input} /> : <RangePicker
                    value={!startTime || !endTime ? null : [moment(startTime, dateFormat), moment(endTime, dateFormat)]} onChange={onPickerChange} format={dateFormat} />
                }
                <Button onClick={() => search()}>搜索</Button>
              </Input.Group>
            </div>
          </div>
          <Spin spinning={loading} delay={500}>
            <ul className="post-list">
              <li style={{ display: alertShow }} className="filter-li">
                <div className="alert-filter">
                  <div>
                    共有<span>{count}</span>条筛选结果
                </div>
                  <a onClick={clearSearch}>清除搜索</a>
                </div>
              </li>
              {
                postData.map(item => {
                  return (
                    <PostItem post={item} key={item._id} />
                  )
                })
              }
            </ul>
          </Spin>
        </div>
        <div className="post-right">
          <BlogIntro />
          <ArticleCalendar setParent={selectCalendar} />
        </div>
      </div>
    </div >
  )
}

// const mapStateToProps = (state: AppStateType) => ({
//   topicInfo: state.topic,
//   channelList: state.channel.list,
//   userInfo: state.user,
// });


export default Home;
