SELECT count(*) FROM posts WHERE name ILIKE CONCAT( $1 , '%') AND active = true;