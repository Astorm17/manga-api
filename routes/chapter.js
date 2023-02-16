import express from 'express';
import cheerio from 'cheerio';
import got from 'got';

const router = express.Router()
router.get('/', (req, res) => {
	(async () => {
		try 
		{
			const siteUrl = "https://www.mangahere.cc/"
			const chapterUrl = req.query['c']
			const result = await got(chapterUrl)
			const $ = await cheerio.load(result.body)
			
			// Get the last page since the reader uses ... for pagination
			var lastPageIndex = $('.pager-list-left span a').length - 2
			const pageCount = await cheerio.load($('.pager-list-left span a').get(lastPageIndex))

			var pageUrl = chapterUrl.substring(0, chapterUrl.lastIndexOf('/') + 1)
			var pages = []
			
			for (var i = 1; i <= pageCount.text(); i++) {
				pages.push( 
					{
						"page": i,
						"pageUrl": pageUrl + i + '.html'
					} 
				)
			}
			
			var chapterResults = {
				"pageCount": pageCount.text(),
				"chapterUrl": pageUrl,
				"pages": pages
			}

			res.send(JSON.stringify(chapterResults))

		}
		catch(err) 
		{
			console.log(err)
		}
	})()
})

export { router } 
