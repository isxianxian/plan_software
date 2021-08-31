import Mock from 'mockjs';
import record from './record-api';

Mock.mock('/news/lists', 'get', record.lists)