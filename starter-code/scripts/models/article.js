'use strict';

(function(module) {
  // DONE: Wrap the entire contents of this file in an IIFE.
  // Pass in to the IIFE a module, upon which objects can be attached for later access.
  function Article (opts) {
    for (let key in opts) {
      this[key] = opts[key];
    }
  }

  Article.allArticles = [];

  Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    return template(this);
  };

  Article.loadAll = function(inputData) {
    /* DONE: the original forEach code should be refactored
    using `.map()` -  since what we are trying to accomplish is the
    transformation of one collection into another. */
    Article.allArticles = inputData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Article(ele);
    });
  };

  /* DONE: Refactoring the Article.fetchAll method, it now accepts a parameter
  that will execute once the loading of articles is done. We do this because
  we might want to call other view functions, and not just renderIndexPage();
  Now instead of calling articleView.renderIndexPage(), we can call
  whatever we pass in! */
  Article.fetchAll = function(nextFunction) {
    if (localStorage.hackerIpsum) {
      $.ajax({
        type: 'HEAD',
        url: '/data/hackerIpsum.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            Article.getAll(nextFunction); // DONE: pass 'nextFunction' into Article.getAll();
          } else {
            Article.loadAll(JSON.parse(localStorage.hackerIpsum));
            // DONE: Replace the following line with 'nextFunction' and invoke it!
            nextFunction();
          }
        }
      });
    } else {
      Article.getAll(nextFunction); // DONE: pass 'nextFunction' into getAll();
    }
  };

  Article.getAll = function(nextFunction) {
    $.getJSON('/data/hackerIpsum.json', function(responseData, message, xhr) {
      localStorage.eTag = xhr.getResponseHeader('eTag');
      Article.loadAll(responseData);
      localStorage.hackerIpsum = JSON.stringify(responseData);
      // DONE invoke our parameter.
      nextFunction();
    });
  };

<<<<<<< HEAD
  // Article.numWordsAll = function() {
  //   return Article.allArticles.map(function(currentArticle) {
  //     return currentArticle.body.match(/\w+/g).length;
  //   })
  //   .reduce(function(acc, curr) {
  //     console.log(acc);
  //     // TODO: complete this function to sum up all of the words.
  //     return acc + curr;
  //   }, 0);
  // }

  Article.allAuthors = function() {
    // TODO: return a mapped collection
    // with just the author names
    return Article.allArticles.map(function(currentArt) {
      return currentArt.author;
      //then chain reduce, and set the accumulator to an array
      // to build a unique list of author names.
    })
  }
=======
  Article.numWordsAll = function() {
    return Article.allArticles.map(function(currentArticle) {
      return currentArticle.body.match(/\w+/g).length;
    })
    .reduce(function(acc, curr) {
      //console.log(acc);
      // TODO: complete this function to sum up all of the words.
      return acc + curr;
      acc.push
    }, 0);
  }

  Article.allAuthors = function() {
    // TODO: return a mapped collection
    // with just the author names ...workout reduce
    //console.log(Article.allArticles)
    return Article.allArticles.map(function(article) {
      return article.author;
    })
    .reduce(function(accum, current) {
      if (accum.indexOf(current) === -1) {
        accum.push(current)
      }
      //then chain reduce, and set the accumulator to an array
      // to build a unique list of author names.
      return accum;
    }, [])
  }

>>>>>>> 8ab1d955c35de6dbf599beb6535e3a86f157cead

  Article.numWordsByAuthor = function() {
    // TODO: transform each author element into an object with 2 properties:
    // one for the author's name, and one for the total number of words
    // written by the specified author.
    return Article.allAuthors().map(function(currentAuthor) {
      console.log(currentAuthor)
      return {
        name: currentAuthor,
<<<<<<< HEAD
        // numWords: // someCollection.filter(function(curArticle) {
=======
        numWords:
        Article.allArticles.filter(function(curArticle) {
          return curArticle.author === currentAuthor;
        })
        //filter takes a condition that has to be returned
        .map(function(authorArticle) {
          return authorArticle.body.split(' ').length;
        })
        .reduce(function(acc, authorWordsPerArticle) {
          return acc + authorWordsPerArticle;
        })
        // numWords: // someCollection.filter(function(curArticle)
>>>>>>> 8ab1d955c35de6dbf599beb6535e3a86f157cead
        // what do we return here to check for matching authors?
        // .map() to return the author's word count for each article body (you may split or regexp)
        // .reduce() to squash this array into one big number, per author.
      }
    });
  }

  module.Article = Article;

>>>>>>> 8ab1d955c35de6dbf599beb6535e3a86f157cead
})(window);
