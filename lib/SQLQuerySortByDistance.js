`SELECT
    id,
    name,
    latitude,
    longitude,
    (
        6371 *
        ACOS(
            COS(RADIANS(${main_latitude})) * COS(RADIANS(latitude)) *
            COS(RADIANS(longitude) - RADIANS(${main_longitude})) +
            SIN(RADIANS(${main_latitude})) * SIN(RADIANS(latitude))
        )
    ) AS distance
FROM
    locations
HAVING
    distance <= 10
ORDER BY
    distance ASC;`
