import Mock, { Random } from 'mockjs';
const lists = function (num = 30) {
  let articles = [];
  for (let i = 0; i < num; i++) {
    let article = Mock.mock({
      'id': '@id',
      'title': '@title',
      'from|1': ['现实', '网络'],
      'peruser|1-2': ['现实', '网络', '听说'],
    });
    articles.push(article);
  };

  return articles;
}

export default {
  lists
}