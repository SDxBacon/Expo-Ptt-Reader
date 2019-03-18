
import cheerio from 'react-native-cheerio';

const baseHost = 'https://www.ptt.cc';

async function fetchAndGetBody(host) {
  const resp = await fetch(host, {
    headers: {
      cookie: `over18=1`
    }});
  const body = await resp.text();
  return body;
}


class PttUtils {

  static async readArticle(href) {
    const host = `${baseHost}${href}`;
    const body = await fetchAndGetBody(host);
    const $ = cheerio.load(body);

    let parsedObject = {};
    
    const $mainContent = $('#main-content');
    const $metaValue = $mainContent.find('.article-metaline .article-meta-value');
    // console.log($metaline.length);

    parsedObject.author = $metaValue.eq(0).text();
    parsedObject.articleTitle = $metaValue.eq(1).text();
    parsedObject.articlePostTime = $metaValue.eq(2).text();
    parsedObject.content = $mainContent.contents().filter(function() { 
      const $this = $(this);
      return !$this.hasClass('article-metaline') && !$this.hasClass('article-metaline-right')
    }).text()
    // const $content = $mainContent.remove('.article-metaline');
    // parsedObject.content = $content.text();

    // console.log(parsedObject)
    return parsedObject;
  }

  static async getHotboardData () {
    const host = `${baseHost}/bbs/index.html`;
    const body = await fetchAndGetBody(host);
    const $ = cheerio.load(body);

    let data = [];
    $('.b-ent').each(function(i, elem) {
      const href = $(this).find('.board').attr('href');
      const boardName = $(this).find('.board-name').text();
      const boardTitle = $(this).find('.board-title').text().slice(1).trim();
      const boardNuser = $(this).find('.board-nuser span').text();
      data.push({href, boardName, boardTitle, boardNuser});
    });

    return data;
  }

  static async getArticlesWithHref(href) {
    const host = `${baseHost}/${href}`;
    const body = await fetchAndGetBody(host);
    const $ = cheerio.load(body);

    let data = [];
    $('.r-ent').each(function() {
      const $this = $(this);
      const $title_link = $this.find('.title a');
      const $meta = $this.find('.meta');

      const href = $title_link.attr('href');
      const nrec = $this.find('.nrec span').text();
      const articleTitle = $title_link.text();
      const author = $meta.find('.author').text();
      const date = $meta.find('.date').text();
      const mark = $meta.find('.mark').text();

      data.push({ href, nrec, articleTitle, author, date, mark }); 
    });

    return data;
  }



}

export default PttUtils;