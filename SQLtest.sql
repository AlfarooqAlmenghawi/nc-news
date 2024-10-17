 SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles 
 LEFT JOIN comments ON comments.article_id = articles.article_id
 GROUP BY article_id