const fs = require('fs');
const path = require('path');

const languages = [
    {
      name: 'JavaScript',
      icon: path.join(__dirname, '../icons/javascript.svg'),
    },
    {
      name: 'HTML',
      icon: path.join(__dirname, '../icons/html.svg'),
    },
    {
      name: 'CSS',
      icon: path.join(__dirname, '../icons/css.svg'),
    },
    {
      name: 'Python',
      icon: path.join(__dirname, '../icons/python.svg'),
    },
    {
      name: 'Java',
      icon: path.join(__dirname, '../icons/java.svg'),
    },
    {
      name: 'TypeScript',
      icon: path.join(__dirname, '../icons/typescript.svg'),
    },
    {
      name: 'Sass',
      icon: path.join(__dirname, '../icons/sass.svg'),
    },
    {
      name: 'Ruby',
      icon: path.join(__dirname, '../icons/ruby.svg'),
    },
    {
      name: 'PHP',
      icon: path.join(__dirname, '../icons/php.svg'),
    },
    {
      name: 'Golang',
      icon: path.join(__dirname, '../icons/golang.svg'),
    },
    {
      name: 'MySQL',
      icon: path.join(__dirname, '../icons/mysql.svg'),
    },
    {
      name: 'Markdown',
      icon: path.join(__dirname, '../icons/markdown.svg'),
    },
];

const getBase64Icon = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    return `data:image/svg+xml;base64,${fileData.toString('base64')}`;
};

module.exports = {
    languages,
    getBase64Icon,
};
