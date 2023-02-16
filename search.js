import express from 'express';
import cheerio from 'cheerio';
import got from 'got';

const router = express.Router()
router.get('/', (req, res) => {
	(async () => {
		try 
		{
			const siteUrl = "https://www.mangahere.cc/"
			const searchQuery = await req.query['s']
			const searchTitle = await req.query['title']
			const apiPath = searchQuery + '&title=' + searchTitle
			const result = await got(apiPath)
			const $ = await cheerio.load(result.body)
			
			var searchResults = []
			
			$('.manga-list-4-list.line li').each(function() {
				searchResults.push(
					{
						"title": $(this).find('a').attr('title'),
						"mangaUrl": $(this).find('a').attr('href'),
						"fullMangaUrl": siteUrl + $(this).find('a').attr('href'),
						"author": $(this).find('p.manga-list-4-item-tip a').attr('title'),
						"thumbnail": $(this).find('img.manga-list-4-cover').attr('src')
					}
				)
			})
			

			var json = {
				"searchResults": searchResults
			}

			res.send(JSON.stringify(json))

		}
		catch(err) 
		{
			console.log(err)
		}
	})()
})

export { router } 

