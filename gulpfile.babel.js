'use strict';

import gulp from 'gulp';
import gplugins from 'gulp-load-plugins';
import {Book} from 'gitbook';
import path from 'path';
import url from 'url';
import fs from 'fs';
import {spawnSync} from 'child_process';
const $ = gplugins();
const webserverOption = {
  livereload: true,
  open: true
};

// default task is start web server.
gulp.task('default', ['webserver', 'watch']);

gulp.task('watch', function () {
  gulp.watch(['book/**/*', 'gitbook.config.json'], ['gitbook.website']);
});

// build website.
gulp.task('build', ['CNAME', 'gitbook.website']);

// create CNAME
gulp.task('CNAME', function (done) {
  const {variables: {domain}} = loadGitbookConfig('website');
  fs.writeFile('CNAME', domain, err => {
    if (err) throw err;
    done();
  });
});

// start web server
gulp.task('webserver', ['build'], function() {
  return gulp.src('website')
    .pipe($.webserver(webserverOption));
});

// create website with gitbook.
gulp.task('gitbook.website', function (done) {
  generateGitbook('website').then(done).catch(done);
});

// return Promise to generate gitbook.
const generateGitbook = type => {
  let book = new Book('book', {config: loadGitbookConfig(type)});
  return book.parse().then(() => book.generate(type));
};

const loadGitbookConfig = type => {
  let gitbookConfig = Object.assign(require('./gitbook.config.json'), {output: type});
  let {version} = require('./package.json');
  gitbookConfig.title += ` ver.${version}`;
  delete require.cache[path.resolve('./gitbook.config.json')];
  delete require.cache[path.resolve('./package.json')];
  return gitbookConfig;
};

// push web directory to `gh-pages` branch.
gulp.task('gh-pages', ['build'], function () {
  let {version, repository: {url: remoteUrl}} = require('./package.json');

  return gulp.src(['./website/**/*', 'CNAME', 'circle.yml'])
    .pipe($.ghPages({remoteUrl}));
});
