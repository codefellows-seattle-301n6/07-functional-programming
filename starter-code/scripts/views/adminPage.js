'use strict';

articleView.renderAdminPage = function() {
  var statsRender = Handlebars.compile($('#stats-template').html());
  function updateAuthorStats(){
    Article.numWordsByAuthor().forEach(function(numWordsObj) {
      $('.author-stats').append(statsRender(numWordsObj));
    });
  }
  updateAuthorStats();
  $('#blog-stats .articles').text(Article.allArticles.length);
  $('#blog-stats .words').text(Article.numWordsAll());
};

Article.fetchAll(articleView.renderAdminPage);
