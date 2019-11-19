const Parser = require('rss-parser');
const cleaner = require('./clean');

let parser = new Parser();
let clear = new cleaner();


class rssModel {
    constructor(){
                
        this.get = async (url) => {
            let feed = await parser.parseURL(url);
            return feed;
        }
    
        this.clean = function (data) {
            return clear.htmlToJson(data)
        }

        this.clear = function (data) {
            return clear.cleanThis(data);
        }


        this.show = async (url, num) => {
            let allFeed = await this.get(url);
            let items = allFeed.items;
            let limit = 0;
            if(items.length < num) {
                limit = items.length;
            }
            else {
                limit = num;
            }
            if (Array.isArray(items) && items.length == 0){
                return "Empty feed";
            } else {
                let limitedFeed = [];
                for(let i = 0; i < limit; i++){
                    //items[i].contentSnippet = this.clean(items[i].contentSnippet);
                    items[i].content = this.clear(items[i].content);
                    //items[i].content = this.clean(items[i].content);
                    items[i].pubDate = this.clear(items[i].pubDate);
                    items[i].contentSnippet = this.clear(items[i].contentSnippet);
                    limitedFeed.push(items[i]);   
                }
                return limitedFeed;
            }
            }

    }
}






module.exports = rssModel