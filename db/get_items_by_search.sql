-- concept only; doesn't work
SELECT *
FROM "Products"
WHERE name ILIKE '%$1%'
   OR title ILIKE '%$1%'
   OR affilliation ILIKE '%$1%'
   OR home_planet ILIKE '%$1%'